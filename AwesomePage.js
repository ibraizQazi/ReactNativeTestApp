'use strict';
var ProgressBar = require('ProgressBarAndroid');
import React, {
  Component,
  Image,
  ListView,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  View
} from 'react-native';

var TimerMixin = require('react-timer-mixin');

var Request_Url = 'http://vod.nayatel.com/?json=get_recent_posts&count=10';

var LOADING = {};

var resultsCache ={
  dataForQuery: {}
};
/*
var SearchBar = React.createClass({
  render: function(){
    return(
      <View style={styles.SearchBar}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search for Movies.."
          onSubmitEditing={this.props.onSearch}
          style={styles.searchBarInput}
        />
      </View>
    );
  }
});
*/
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <View style={styles.SearchBar}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search for Movies.."
          onSubmitEditing={this.props.onSearch}
          style={styles.searchBarInput}
        />
      </View>
    );
  }
}

class AwesomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
    }

    componentDidMount(){
      this.fetchData();
    }
    //_urlForQuery(query | )

  /*  searchMedia(query){
      var cachedResultsForQuery = resultsCache.dataForQuery[query];
      if (cachedResultsForQuery){
        if (!LOADING[query]){
          return cachedResultsForQuery;
        }
        else {
          LOADING[query] = true;
          resultsCache.dataForQuery[query] = null;

          fetch(this._urlForQuery(query))
        }
      }
    }*/


    fetchData(){
      fetch(Request_Url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
          loaded: true,
        });
      })
      .done();
    }

   render() {
      if (!this.state.loaded) {
        return this.renderLoadingView();
      }
       return (
         /*<View>
          <SearchBar
            onSearch={(event) => {
              var searchString = event.nativeEvent.text;

              setTimeout(() => {
                this.searchMedia(searchString);
              }, 100);
            }}
          />
          </View>*/
          <ListView dataSource={this.state.dataSource}
           renderRow={this.renderMovie} style={styles.listView} />


         );
     }

  renderLoadingView(){
    return (
      <ProgressBar
        style={{marginTop: 150}}
        color={"blue"}
        justifyContent={'center'}
        progress={this.state.progress}
      />
    );
  }

  renderMovie(posts){
    return(
    <View style ={styles.container}>
      <Image
        source={{uri: posts.thumbnail}}
        style={styles.thumbnail}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{posts.title}</Text>
        <Text style={styles.year}>{posts.date}</Text>
      </View>
    </View>);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 30,
    backgroundColor: '#F5FCFF',
  },
  SearchBar: {
    marginTop: 10,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  searchBarInput: {
    paddingTop: -2,
    fontSize: 15,
    flex: 1,
    height: 30,
  }
});
module.exports= AwesomePage;
