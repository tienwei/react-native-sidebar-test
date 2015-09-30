'use strict';

var React = require('react-native');
var PropertyView = require('./PropertyView');
var {
	View,
	StyleSheet,
	Image,
	Text,
	TouchableHighlight,
	ListView,
	Component
} = React;

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

class SearchResults extends Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1.guid !== r2.guid
		});
		this.state = {
			dataSource: ds.cloneWithRows(this.props.listings)
		};
	}

	renderRow(rowData, sectionID, rowID) {
		console.log(rowData);
		var price = rowData.price_formatted.split(' ')[0];
		return (
			<TouchableHighlight
				underlayColor='#dddddd'
				onPress={() => this.rowPressed(rowData.guid)}>
				<View>
					<View style={styles.rowContainer}>
						<Image source={{uri: rowData.img_url}} style={styles.thumb}/>
						<View style={styles.textContainer}>
							<Text style={styles.price}>${price}</Text>
							<Text style={styles.title} numberOfLines={1}>
								{rowData.title}
							</Text>
						</View>
					</View>
					<View style={styles.separator}/>	
				</View>
			</TouchableHighlight>
		);
	}

	render() {
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)} />
		);
	}

	rowPressed(propertyGuid) {
		var property = this.props.listings.filter(prop => prop.guid === propertyGuid)[0];
		this.props.navigator.push({
			title: 'Result',
			component: PropertyView,
			passProps: {property: property}
		})
	}
}

module.exports = SearchResults;