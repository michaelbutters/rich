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
    title: "Michael's Spending",
  };

  state = {
    data: data.getArticles(),
  };

  extractItemKey = (item) => `${item.id}`;

  calculateDate(daynumber){
    return '1st Jan 2018 (' + daynumber + ')'
  }

  renderItem = ({ item }) => (

      <RkCard rkType='imgBlock' style={styles.card}>
        <RkText rkType='header4 inverseColor'>{item.header}</RkText>
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
          <View>
            <RkText rkType='secondary1'> </RkText>
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch' }}>
            <RkText rkType='secondary1'>{ this.calculateDate(item.daynumber) }</RkText>          
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch' }}>
            <RkText rkType='secondary1'>{ item.transactiontype }</RkText>          
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch', color: 'green' }}>
            <RkText rkType='secondary1'>{ '+ ' + item.amount }</RkText>          
          </View>
          <View>
            <RkText rkType='secondary1'> </RkText>
          </View>
        </View>
        <View>
          <RkText rkType='secondary1'> </RkText>
        </View>
      </RkCard>
  );

  render = () => (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={this.extractItemKey}
        style={styles.container}
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
    marginVertical: 8,
  },
  time: {
    marginTop: 5,
  },
}));
