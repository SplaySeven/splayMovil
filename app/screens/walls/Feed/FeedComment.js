import React, {useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {GET_COMMENTS} from '../../../recursos/gql/comment';
import CommentList from '../Feed/CommentList';
import {FlatList, ScrollView} from 'react-native';
const FeedComment = props => {
  const {feed} = props;
  const {data, loading, startPolling, stopPolling} = useQuery (GET_COMMENTS, {
    variables: {
      idPublication: feed.item.id,
    },
  });

  useEffect (
    () => {
      startPolling (1000);
      return () => {
        stopPolling;
      };
    },
    [startPolling, stopPolling]
  );

  if (loading) return null;
  const {getComments} = data;
  return (
    <FlatList
      data={getComments}
      renderItem={getComment => <CommentList getComment={getComment} />}
      keyExtractor={(getComment, index) => index.toString ()}
    />
  );
};

export default FeedComment;
