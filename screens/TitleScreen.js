import React from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
  Text,
  Image,
  Linking
} from 'react-native';
import { WebBrowser } from 'expo';
import styles from '../styles/TitleStyles'
import { Ionicons } from '@expo/vector-icons'
import StarRating from 'react-native-star-rating'
import Colors from '../constants/Colors'

export default class TitleScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    titleDetails: {},
    isLoading: false
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    const title = this.props.navigation.getParam('title')
    
    fetch(`https://us-central1-whatsonnetflix-991e9.cloudfunctions.net/getNetflixDetailsById?netflixId=${title.netflixId}`, { method: 'GET' })
      .then(response => response.json())
      .then(json => {
        this.setState({
          isLoading: false,
          titleDetails: Object.assign(title, json)
        })
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <View style={styles.container}>
        { this.state.isLoading 
          ? <View style={styles.centerContainer}><ActivityIndicator size="large" color="#fff" /></View>
          : this.renderTitleDetails()
        }
      </View>
    )
  }

  renderTitleDetails () {
    const title = this.state.titleDetails

    return (
      <ScrollView style={styles.scrollContainer}>
        { this.renderCoverArt(title) }
        { this.renderStars(title) }
        { this.renderWatchButton(title) }
        <View style={styles.infoContainer}>
          { this.renderHeader(title)}
          <View style={styles.generalInfo}>
            { this.renderGenres(title) }
            { this.renderRuntime(title) }
          </View>
          { this.renderDescription(title) }
        </View>
      </ScrollView>
    )
  }

  renderWatchButton (title) {
    if (!title.nfinfo) return

    return (
      <View>
        <TouchableHighlight
            onPress={() => {
              Linking.openURL(`https://www.netflix.com/watch/${title.nfinfo.netflixid}`).catch(err => console.error('An error occurred', err))}
            }
            underlayColor={Colors.primaryDark}
            activeOpacity={1}
            style={styles.watchButton}>
            <Text style={styles.watchButtonText}>Watch on Netflix</Text>   
        </TouchableHighlight>
      </View>
    )
  }

  renderHeader (title) {
    return (
      <View style={styles.headerContainer}>
        <Text style={[styles.mainText, styles.header]}>{title.title || title.name}</Text>
        <Text style={[styles.mainText, styles.header, styles.year]}>
        (
          {title.release_date ?
            String(title.release_date.substring(0, 4))
              :
            title.first_air_date ?
              String(title.first_air_date.substring(0, 4))
              :
              ''
          }
        )
        </Text>
      </View>
    )
  }

  renderGenres (title) {
    if (!title.mgname) return null

    return (
      <View>
        <Text style={[styles.miniHeader]}>Genres</Text>
        <Text style={[styles.mainText, styles.infoText]}>{title.mgname.join(', ')}</Text>
      </View>
    )
  }

  getGenres (genres) {
    return genreList.join(', ')
  }

  renderRuntime (title) {
    if (!title.nfinfo) return null

    return (
      <View>
        <Text style={[styles.mainText, styles.miniHeader]}>Runtime</Text>
        <Text style={[styles.mainText, styles.infoText]}>{ String(title.nfinfo.runtime) }</Text>
      </View>
    )
  }

  renderCoverArt (title) {
    const mainImage = 'https://image.tmdb.org/t/p/' + 'w780' + title.backdrop_path

    return (
      <View style={styles.coverArtContainer}>
        <Image
          source={{uri: mainImage}}
          style={styles.coverArt}
          resizeMode='contain'/>
        {this.renderVideoLink(title)}
      </View>
    )
  }

  renderVideoLink (title) {
    const video = title.videos && title.videos.results[0]
    if (!video || !video.key) return null
//youtube-play
//onPress={this.openVideo.bind(this, video)}
    return (
      <TouchableHighlight style={styles.videoLink}>
        <Ionicons style={styles.searchResetButton} name="md-refresh" size={60} color='#fff' />
      </TouchableHighlight>
    )
  }

  renderStars(title) {
    console.log('vote ', title.vote_average)
    return (
      <View>
        {title.vote_average ? (<View style={styles.stars}><StarRating starSize={30} fullStarColor={'#E0B127'} color={'#E0B127'} rating={title.vote_average/2}/></View>) : null }
      </View>
    )  
  }

  renderDescription(title) {
    if (!title.overview && !title.tagline) return null

    return (
      <View>
        {title.tagline ? (<Text style={[styles.mainText, styles.tagline]}>{ String( title.tagline) }</Text>) : null }
        <Text style={[styles.mainText, styles.miniHeader]}>Overview</Text>
        <Text style={[styles.mainText, styles.description]}>{String(title.overview)}</Text>
      </View>
    )
  }
}