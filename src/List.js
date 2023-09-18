import React from 'react';
import Card from './Card';
import { ScrollView } from 'react-native';

const List = ({data, onCardClicked}) => {

  return (
    <ScrollView style={{width: '100%', flex:1}}>
      {data.map((item, index) => {
        return (
          <Card
            key={item._id}
            index={index}
            item={item}
            onCardClicked={onCardClicked}
          />
        );
      })}
    </ScrollView>
  );
};

export default List;