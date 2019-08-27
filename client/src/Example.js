import React from 'react';
import axios from 'axios';

class Example extends React.Component {
  componentDidMount() {
    axios({
      method: 'post',
      url: 'https://instagram.com/chanelcartoon01'
    })
    .then(response => {
      let result = [];
      let images = [];
      const temp1 = response.data.split('window._sharedData = ');
      const temp2 = temp1.length ? temp1[1].split(';</script>') : [null];
      const data = JSON.parse(temp2[0]);

      if (data && data['entry_data']['ProfilePage'] && data['entry_data']['ProfilePage'].length) {
        images = data['entry_data']['ProfilePage'][0]['graphql']['user']['edge_owner_to_timeline_media']['edges'];
      } else if (data && data['entry_data']['TagPage'] && data['entry_data']['TagPage'].length) {
        images = data['entry_data']['TagPage'][0]['graphql']['hashtag']['edge_hashtag_to_media']['edges'];
      }

      images.forEach(image => {
        let type = 'image';
        let caption = 'Instagram Image';
        let link = null;

        if (image['node']['is_video']) {
          type = 'video';
        }

        if (image['node']['edge_media_to_caption']['edges'].length && image['node']['edge_media_to_caption']['edges'][0]['node']['text']) {
          caption = image['node']['edge_media_to_caption']['edges'][0]['node']['text'];
        }

        if (image['node']['shortcode']) {
          link = '//instagram.com/p/' + image['node']['shortcode'];
          link.replace(/\/$/, '');
        }

        result.push({
          type,
          caption,
          link,
          time: image['node']['taken_at_timestamp'],
          comments: image['node']['edge_media_to_comment']['count'],
          likes: image['node']['edge_liked_by']['count'],
          thumbnail: image['node']['thumbnail_resources'][0]['src'].replace('/^https?\:/i', ''),
          small: image['node']['thumbnail_resources'][2]['src'].replace('/^https?\:/i', ''),
          large: image['node']['thumbnail_resources'][4]['src'].replace('/^https?\:/i', ''),
          original: image['node']['display_url'].replace('/^https?\:/i', '')
        });
      });

      console.log('Result: ', result);
    });
  }

  render() {
    return (
      <div className="Example">
        Example
      </div>
    );
  }
}

export default Example;
