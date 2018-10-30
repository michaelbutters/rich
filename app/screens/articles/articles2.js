import React from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet,
} from 'react-native-ui-kitten';
import { SocialBar } from '../../components';
import { data } from '../../data';
import NavigationType from '../../config/navigation/propTypes';

const moment = require('moment');

export class Articles2 extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: " ",
  };

  constructor(props) {
    super(props);

    var today = new Date()
    var currentDate = new Date(2018, 0, 1, 0, 0, 0, 0)
    var theData = []
    var theTotal = 0
    while(true){
      if(currentDate > today){
        break
      }

      interestPercentage = 0.000465753424658
      theDate = new Date(currentDate.getTime())
      theAmount = this.calculateAmount(theDate)
      theTotal = theTotal + theAmount
      interest = theTotal * interestPercentage
      theTotal = theTotal + interest
      theData.unshift({id: theDate.toString() + 'D', date: theDate, transactiontype: 'DEPOSIT', amount: theAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") })
      theData.unshift({id: theDate.toString() + 'I', date: theDate, transactiontype: 'INTEREST', amount: interest.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") })
      currentDate.setDate(currentDate.getDate()+1);
    }

    // Don't call this.setState() here!
    this.state = {
      total: theTotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      data: theData,
    };

    
    this.state.data.forEach(function(item) {
      console.log(item.date);
      console.log(item.transactiontype);
    });

    this.calculateAmount = this.calculateAmount.bind(this)
  }


  extractItemKey = (item) => `${item.id}`;

  calculateAmount(date){
    var random = date.getTime()
    var amount = 25000 + ((random / 1000) % 14123)
    return amount
  }

  renderHeader = () => {
    return <View><RkText rkType='header2 center'>{"\nMichael's Spending\n"}</RkText><RkText rkType='header2 center' style={{color: 'green' }}>{"$ " + this.state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "\n"}</RkText></View>
  }

  renderItem = ({ item }) => (

      <RkCard rkType='imgBlock' style={styles.card}>
        <RkText rkType='header4 inverseColor'>{'header'}</RkText>
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
          <View>
            <RkText rkType='primary2'> </RkText>
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch' }}>
            <RkText rkType='primary2'>{ item.date.toLocaleDateString("en-NZ", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) }</RkText>          
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch' }}>
            <RkText rkType='primary2' style={{ textAlign: 'center' }}>{ item.transactiontype }</RkText>          
          </View>
          <View style={{ flex: 1, alignSelf: 'flex-end' }}>
            <RkText rkType='primary2' style={{color: 'green', alignSelf: 'flex-end'}}>{ '+' + item.amount }</RkText>          
          </View>
          <View>
            <RkText rkType='primary2'>  </RkText>
          </View>
        </View>
        <View>
          <RkText rkType='primary2'> </RkText>
        </View>
      </RkCard>
  );

  render = () => (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={this.extractItemKey}
        style={styles.container}
        ListHeaderComponent={this.renderHeader}
        stickyHeaderIndices={[0]}
      />
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  card: {
    marginVertical: 1,
  },
  time: {
    marginTop: 5,
  },
}));
