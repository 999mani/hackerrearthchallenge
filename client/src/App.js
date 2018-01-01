import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {blue500, yellow600,red900,purple500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';


const urlToFetch =  "http://localhost:8080/loaddata"

const styles = {
  underlineStyle: {
    borderColor: "#323853",
    
  }
};


class SearchBar extends Component{

  handleChange = (event) =>{
    this.props.searchInput(event.target.value);
  }

  render() {
    return(
        <TextField
          fullWidth={true}
          hintText="Search ISP by Name"
          underlineStyle={styles.underlineStyle}
          onChange={this.handleChange.bind(this)}
        />
    ) 
  }
}

class SearchResult extends Component{

  constructor(props) {
    super(props);
    this.state = {
      data:this.props.listdata
    }
  }


  handleClick = (index) =>{
    this.props.changeIndex(index);
  }

  render() {

    if(!this.props.listdata)
      return <p>Loading...</p>

     const prep = this.props.listdata.map((item, index) =>
      <ListItem key={index}
      onClick={()=>this.handleClick(index)}
      leftAvatar={<Avatar src={item.image} backgroundColor={blue500} />}
      primaryText={item.name}
      secondaryText={item.lowest_price+" Rs"} />);

    return(
       <List>{prep}</List>
    )
 }
}

class IspDetailInfo extends Component{

  render() {

    if(!this.props.data)
      return <p></p>

    return(
      <Card>
             <CardMedia
                overlay={<CardTitle title={this.props.data.name}/>}>
                <img src={this.props.data.image} alt="" />
              </CardMedia>
             
              <List>
                <ListItem
                  leftAvatar={<Avatar icon={<i className="material-icons">wifi</i>} backgroundColor={blue500} />}
                  primaryText="Maximum Speed"
                  secondaryText={this.props.data.max_speed}
                />
                <ListItem
                  leftAvatar={<Avatar icon={<i className="material-icons">phone</i>} backgroundColor={yellow600} />}
                 
                  primaryText="Mobile"
                  secondaryText={this.props.data.contact_no}
                />
                <ListItem
                  leftAvatar={<Avatar icon={<i className="material-icons">email</i>} backgroundColor={purple500} />}
                 
                  primaryText="Email"
                  secondaryText={this.props.data.email}
                />
                <ListItem
                  leftAvatar={<Avatar icon={<i className="material-icons">money</i>} backgroundColor={red900} />}
                 
                  primaryText="Minimum Plan"
                  secondaryText={this.props.data.lowest_price}
                />
              </List>
              <CardText>
                {this.props.data.description}
              </CardText>

              <CardActions>
               <FlatButton
                  href={this.props.data.url}
                  target="_blank"
                  label="DOWNLOAD"
                  secondary={true}
                  icon={<i className="material-icons">arrow_downward</i>}
                />
                 <FlatButton
                  href={this.props.data.url}
                  target="_blank"
                  label="SHARE"
                  secondary={true}
                  icon={<i className="material-icons">share</i>}
                />
                 <FlatButton
                  href={this.props.data.url}
                  target="_blank"
                  label="LINK"
                  secondary={true}
                  icon={<i className="material-icons">link</i>}
                />
              </CardActions>
            </Card> 
    )
  }
}

class App extends Component {

 constructor(props) {
    super(props);
    this.state = {
      siteData: ""
    }
  }

  componentDidMount()
  {
    fetch(urlToFetch)
    .then(d=>d.json())
    .then(d=>{
      this.setState({
        siteData:d
      })
    })

    this.setState({
      loadindex:0
    })

  }

  changeloadIndex = (index) => {
    this.setState({loadindex:index});
  }

  searchInputChange = (key) => {
    if(key == "")
    {
      fetch(urlToFetch)
      .then(d=>d.json())
      .then(d=>{
        this.setState({
          siteData:d
        })
      })

      this.setState({
        loadindex:0
      })
    }
    else
    {
      fetch("http://localhost:8080/search?key="+key)
      .then(d=>d.json())
      .then(d=>{
        this.setState({
          siteData:d
        })
      })

      this.setState({
        loadindex:0
      })
    }
  }

  render() {

    if(!this.state.siteData) return <p>Loading...</p>   

    console.log("Parent Rendered loadindex:"+this.state.loadindex);

    return (

      <div>
        <AppBar
          title="ISP hackerearth"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconElementLeft = { <Avatar src="https://hackerearth.global.ssl.fastly.net/static/hackerearth/images/logo/HE_identity.png" />}
          style={{backgroundColor:"#323853"}}  
        />

        <div className="page-container">
         
          <div className="left-container">
             <Card style={{width:"100%",height:"100%",border:"1px solid #efefef","padding":"20px"}}>
                 <SearchBar searchInput={this.searchInputChange} />
                 <SearchResult listdata={this.state.siteData} changeIndex={this.changeloadIndex}/>
             </Card> 
          </div>

          <div className="right-container">
             <IspDetailInfo data={this.state.siteData[this.state.loadindex]}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
