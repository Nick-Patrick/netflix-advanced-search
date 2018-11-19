import React from 'react';
import {
  ScrollView,
  TouchableHighlight,
  View,
  Text,
  Picker,
  TextInput,
  ToastAndroid
} from 'react-native'
import { AdMobInterstitial, FacebookAds } from 'expo'
import styles from '../styles/SearchStyles'
import { Ionicons } from '@expo/vector-icons'
import _ from 'lodash'
import qs from 'qs'
import AdBanner from '../components/AdBanner'
import SearchButton from '../components/Search/SearchButton'
import MediaTypeButtonGroup from '../components/Search/MediaTypeButtonGroup'
import ModalDropdown from 'react-native-modal-dropdown'
import Layout from '../constants/Layout'

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  initialState = {
    adsShown: 0,
    selectedCountryId: 'US',
    selectedMediaType: 'Any',
    selectedGenreId: '',
    selectedRecentlyAddedDuration: '',
    selectedYearFrom: '',
    selectedYearTo: '',
    selectedRatingMin: '',
    selectedRatingMax: 100,
    selectedKeywords: '',
    isLoading: false,
    isLoadingNew: false,
    titles: [],
    extraTitles: [],
    page: 1
  }

  state = this.initialState

  constructor(props) {
    super(props)
    AdMobInterstitial.setAdUnitID('ca-app-pub-1684745089786714/6325082779')
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          { this.renderMediaTypeButtonGroup() }
          { this.renderDivider() }
          { this.renderCountryDropdown() }
          { this.renderDivider() }
          { this.renderGenreDropdown() }
          { this.renderDivider() }
          { this.renderYearsDropdown() }
          { this.renderDivider() }
          { this.renderRatingsDropdown() }
          { this.renderDivider() }
          { this.renderKeywords() }
          { this.renderDivider() }
        </ScrollView>
        { this.renderSearchArea() }
        <AdBanner/>
      </View>
    )
  }

  renderKeywords () {
    return (
      <View style={styles.formInputContainer}>
        <Text style={[styles.formInputLabel, styles.keywordsLabel]}>Keywords (title / cast)</Text>
      
        <TextInput
          style={{ height: 40, width: 120, fontSize: 17, lineHeight: 20, paddingHorizontal: 4 }}
          onChangeText={(selectedKeywords) => this.setState({selectedKeywords})}
          value={this.state.selectedRecentlyAddedDuration ? '' : this.state.selectedKeywords}
          placeholder={'e.g. Brad Pitt'}
          editable={!this.state.selectedRecentlyAddedDuration}
        />
      </View>
    )
  }

  renderDropdown (label, data, onValueChange, state) {
    const values = [].concat(data.map(item => item.label))

    const el = (
      <View style={styles.formInputContainer}>
        <Text style={styles.formInputLabel}>{label}</Text>
        <ModalDropdown 
          ref="a"
          defaultValue={state ? values[0] : 'Any'}
          style={styles.dropdownButton}
          textStyle={styles.dropdownText}
          adjustFrame={(obj) => {
            obj.top = 50
            obj.left = 0
            obj.height = Layout.window.height - 70
            obj.width = Layout.window.width
            return obj
          }}
          dropdownStyle={styles.dropdownModal}
          dropdownTextStyle={styles.dropdownModalText}
          options={values} 
          onSelect={onValueChange}/>
      </View>
    ) 

    return el
  }

  renderYearsDropdown () {
    const currentYear = new Date().getFullYear()
    const yearsFrom = []
    const yearsTo = []
   

    for (var i = 1950; i <= currentYear; i++) {
      if (i === 1950) yearsFrom.push({ label: 'Any', id: '' })
      yearsFrom.push({ label: i.toString(), id: i })
    }
    
    for (var i = 2019; i >= this.state.selectedYearFrom; i--) {
      if (i === 2018) yearsTo.push({ label: 'Any', id: '' })
      yearsTo.push({ label: i.toString(), id: i })
    }

    const onFromValueChange = index => this.setState({ selectedYearFrom: yearsFrom[index].id })
    const onToValueChange = index => this.setState({ selectedYearTo: yearsTo[index].id })

    return (
      <View>
        <View style={styles.yearFromDropdown}>
          { this.renderDropdown('Year from', yearsFrom, onFromValueChange.bind(this), this.state.selectedYearFrom) }
        </View>
        <View>
          { this.renderDropdown('Year to', yearsTo, onToValueChange.bind(this), this.state.selectedYearTo) }
        </View>
      </View>
    )
  }

  renderRatingsDropdown () {
    const ratingMin = []
    const ratingMax = []

    for (var i = 0; i <= 10; i++) {
      if (i === 0) ratingMin.push({ label: 'Any', id: '' })
      ratingMin.push({ label: i.toFixed(1).toString(), id: i })
    }
    
    for (var i = 10; i >= 0; i--) ratingMax.push({ label: i.toFixed(1).toString(), id: i })

    const onFromValueChange = index => this.setState({ selectedRatingMin: ratingMin[index].id })    
    const onToValueChange = index => this.setState({ selectedRatingMax: ratingMax[index].id })
    // return this.renderDropdown('IMDB min rating', ratingMin, onFromValueChange.bind(this), this.state.selectedRatingMin)

    return (
      <View>
        <View style={styles.yearFromDropdown}>
          { this.renderDropdown('IMDB min rating', ratingMin, onFromValueChange.bind(this), this.state.selectedRatingMin) }
        </View>
         <View>
           { this.renderDropdown('IMDB max rating', ratingMax, onToValueChange.bind(this), this.state.selectedRatingMax) }
         </View>
      </View>
    )
  }

  renderCountryDropdown () {
    const countries = [
      { id: 'US', label: 'United States' },
      { id: 'AU', label: 'Australia' },
      { id: 'BR', label: 'Brazil' },
      { id: 'CA', label: 'Canada' },
      { id: 'FR', label: 'France' },
      { id: 'DE', label: 'Germany' },
      { id: 'IN', label: 'India' },
      { id: 'IT', label: 'Italy' },
      { id: 'JP', label: 'Japan' },
      { id: 'NL', label: 'Netherlands' },
      { id: 'PL', label: 'Poland' },
      { id: 'RU', label: 'Russia' },
      { id: 'SE', label: 'Spain'},
      { id: 'GB', label: 'United Kingdom' }
    ]

    const onValueChange = index => this.setState({ selectedCountryId: countries[index].id })
    return this.renderDropdown('Country', countries, onValueChange.bind(this), this.state.selectedCountryId)
  }

  renderGenreDropdown () {
    const genres = [
      { id: '', label: 'Any' },
      { id: 1365, label: 'Action' },
      { id: 7424, label: 'Anime' },
      { id: 6548, label: 'Comedy' },
      { id: 6839, label: 'Documentary' },
      { id: 5763, label: 'Drama' },
      { id: 8711, label: 'Horror' },
      { id: 1492, label: 'Sci-Fi' },
      { id: 8933, label: 'Thriller' }
    ]

    const onValueChange = index => this.setState({ selectedGenreId: genres[index].id })
    return this.renderDropdown('Genre', genres, onValueChange.bind(this), this.state.selectedGenreId)
  }

  renderRecentlyAddedDurationDropdown () {
    const onValueChange = index => this.setState({ selectedRecentlyAddedDuration: days[index].id })
    const days = [
      { id: '', label: 'Any' },
      { id: 1, label: '1 Day' },
      { id: 7, label: '7 Days' },
      { id: 30, label: '30 Days' }
    ]

    return this.renderDropdown('Recently added', days, onValueChange.bind(this), this.state.selectedRecentlyAddedDuration)
  }

  renderDivider () {
    return <View style={styles.divider}></View>
  }

  renderMediaTypeButtonGroup () {
    const setState = type => this.setState({ selectedMediaType: type })

    return <MediaTypeButtonGroup 
      onPress={setState}
      showTypeAllActive={this.state.selectedMediaType === 'Any'}
      showTypeMoviesActive={this.state.selectedMediaType === 'Movie'}
      showTypeTVActive={this.state.selectedMediaType === 'Series'}
    />
  }

  onSearchNewPress () {
    this.setState({ isLoadingNew: true })
    const qsParams = {
      countryId: this.state.selectedCountryId,
      recentlyAdded: 7
    }

    const apiEndpoint = `https://us-central1-whatsonnetflix-991e9.cloudfunctions.net/netflixAdvancedSearch?${qs.stringify(qsParams)}`
    fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => {
      this.setState({ 
        isLoadingNew: false,
        titles: json.results
      }, () => {
        if (!json.results || !json.results.length) {
          return ToastAndroid.showWithGravity(
            'No titles found, maybe try something else?',
            ToastAndroid.CENTER,
            ToastAndroid.SHORT
          )
        }
        
        const { navigate } = this.props.navigation;
        navigate('Grid', { titles: this.state.titles, qsParams })
        
        // if (this.state.adsShown == 0 || this.state.adsShown % 5 == 0)
        // FacebookAds.InterstitialAdManager.showAd('720928951616342_721084251600812')
        //   .then(didClick => {})
        //   .catch(error => {})
        // this.setState({adsShown: this.state.adsShown + 1})

        if (this.state.adsShown == 0 || this.state.adsShown % 2 == 0) {
          await AdMobInterstitial.requestAdAsync();
          await AdMobInterstitial.showAdAsync();
        }
        this.setState({adsShown: this.state.adsShown + 1})
      })
    })
  }

  onSearchPress () {
    this.setState({ isLoading: true })
    const qsParams = {
      genreId: this.state.selectedGenreId,
      countryId: this.state.selectedCountryId,
      startYear: this.state.selectedYearFrom,
      endYear: this.state.selectedYearTo,
      query: this.state.selectedKeywords,
      recentlyAdded: this.state.selectedRecentlyAddedDuration,
      mediaType: this.state.selectedMediaType,
      minImdbRating: this.state.selectedRatingMin,
      maxImdbRating: this.state.selectedRatingMax,
      page: this.state.page
    }

    const apiEndpoint = `https://us-central1-whatsonnetflix-991e9.cloudfunctions.net/netflixAdvancedSearch?${qs.stringify(qsParams)}`

    fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => {
      this.setState({ 
        isLoading: false,
        titles: json.results
      }, () => {
        if (!json.results || !json.results.length) {
          return ToastAndroid.showWithGravity(
            'No titles found, maybe try something else?',
            ToastAndroid.CENTER,
            ToastAndroid.SHORT
          )
        }
        
        const { navigate } = this.props.navigation;
        navigate('Grid', { titles: this.state.titles, qsParams })
        // FacebookAds.InterstitialAdManager.showAd('720928951616342_721084251600812')
        //   .then(didClick => {})
        //   .catch(error => {})
        // this.setState({adsShown: this.state.adsShown + 1})
        AdMobInterstitial.requestAd().then(() => {
          if (this.state.adsShown == 0 || this.state.adsShown % 5 == 0) AdMobInterstitial.showAd()
          this.setState({adsShown: this.state.adsShown + 1})
        })
      })
    })
  }

  renderSearchArea () {
    return <SearchButton 
      onResetPress={() => { this.setState(this.initialState)}}
      onSearchPress={() => {         
        this.onSearchPress() 
      }}
      onRecentlyAddedPress={() => { this.onSearchNewPress() }}
      optionsSelected={this.getOptionsSelected()}
      isLoading={this.state.isLoading}
      isLoadingNew={this.state.isLoadingNew}
    />
  }

  getOptionsSelected () {
    function difference(object, base) {
	    function changes(object, base) {
		    return _.transform(object, function(result, value, key) {
          if (!_.isEqual(value, base[key])) {
            result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
          }
        })
      }
      return changes(object, base);
    }

    const optionsSelected = difference(this.state, this.initialState)
    delete optionsSelected['titles']
    delete optionsSelected['isLoading']
    delete optionsSelected['isLoadingNew']
    delete optionsSelected['page']
    delete optionsSelected['extraTitles']

    return Object.keys(optionsSelected).length
  }
}