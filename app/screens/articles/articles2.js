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

  state = {
    data: data.getArticles(),
  };

  extractItemKey = (item) => `${item.id}`;

  calculateDate(daynumber){
    return '1st Jan 2018 (' + daynumber + ')'
  }

  renderHeader = () => {
    return <View><RkText rkType='header2 center'>{"\nMichael's Spending\n"}</RkText><RkText rkType='header2 center' style={{color: 'green' }}>{"$ 213,043,002.12\n"}</RkText></View>
  }

  renderItem = ({ item }) => (

      <RkCard rkType='imgBlock' style={styles.card}>
        <RkText rkType='header4 inverseColor'>{item.header}</RkText>
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
          <View>
            <RkText rkType='primary2'> </RkText>
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch' }}>
            <RkText rkType='primary2'>{ this.calculateDate(item.daynumber) }</RkText>          
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
