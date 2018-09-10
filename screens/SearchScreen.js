import React from 'react';
import {
  ScrollView,
  TouchableHighlight,
  View,
  Text,
  Picker,
  TextInput,
  ToastAndroid
} from 'react-native';
import { WebBrowser } from 'expo';
import styles from '../styles/SearchStyles'
import { Ionicons } from '@expo/vector-icons'
import _ from 'lodash'
import qs from 'qs'
import SearchButton from '../components/Search/SearchButton'
import MediaTypeButtonGroup from '../components/Search/MediaTypeButtonGroup'
import ModalDropdown from 'react-native-modal-dropdown'
import Layout from '../constants/Layout'

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  initialState = {
    selectedMediaType: 'Any',
    selectedGenreId: '',
    selectedRecentlyAddedDuration: '',
    selectedYearFrom: '',
    selectedYearTo: '',
    selectedRatingMin: '',
    selectedRatingMax: 100,
    selectedKeywords: '',
    isLoading: false,
    titles: [],
    extraTitles: [],
    page: 1
  }

  state = this.initialState 

  render () {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          { this.renderMediaTypeButtonGroup() }
          { this.renderDivider() }
          { this.renderGenreDropdown() }
          { this.renderDivider() }
          { this.renderRecentlyAddedDurationDropdown() }
          { this.renderDivider() }
          { this.renderYearsDropdown() }
          { this.renderDivider() }
          { this.renderRatingsDropdown() }
          { this.renderDivider() }
          { this.renderKeywords() }
          { this.renderDivider() }
        </ScrollView>
        { this.renderSearchArea() }
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

    return (
      <View style={styles.formInputContainer}>
        <Text style={styles.formInputLabel}>{label}</Text>
        <ModalDropdown 
          defaultValue={'Any'}
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
  }

  renderYearsDropdown () {
    const currentYear = new Date().getFullYear()
    const yearsFrom = []
    const yearsTo = []
    const onFromValueChange = index => this.setState({ selectedYearFrom: yearsFrom[index] })
    const onToValueChange = index => this.setState({ selectedYearTo: yearsTo[index] })

    for (var i = 1950; i <= currentYear; i++) {
      if (i === 1950) yearsFrom.push({ label: 'Any', id: '' })
      yearsFrom.push({ label: i.toString(), id: i })
    }
    
    for (var i = 2019; i >= this.state.selectedYearFrom; i--) {
      if (i === 2018) yearsTo.push({ label: 'Any', id: '' })
      yearsTo.push({ label: i.toString(), id: i })
    }

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
    const onFromValueChange = (selectedRatingMin) => this.setState({ selectedRatingMin })
    // const onToValueChange = (selectedRatingMax) => this.setState({ selectedRatingMax })

    for (var i = 0; i <= 10; i++) {
      if (i === 0) ratingMin.push({ label: 'Any', id: '' })
      ratingMin.push({ label: i.toFixed(1).toString(), id: i })
    }
    // for (var i = 100; i >= 0; i--) ratingMax.push({ label: i.toString(), id: i })
    return this.renderDropdown('IMDB rating min', ratingMin, onFromValueChange.bind(this), this.state.selectedRatingMin)

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

  renderGenreDropdown () {
    const onValueChange = index => this.setState({ selectedGenreId: genres[index] })
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

    return this.renderDropdown('Genre', genres, onValueChange.bind(this), this.state.selectedGenreId)
  }

  renderRecentlyAddedDurationDropdown () {
    const onValueChange = index => this.setState({ selectedRecentlyAddedDuration: days[index] })
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
      })
    })
  }

  renderSearchArea () {
    return <SearchButton 
      onResetPress={() => { this.setState(this.initialState)}}
      onSearchPress={() => { this.onSearchPress() }}
      optionsSelected={this.getOptionsSelected()}
      isLoading={this.state.isLoading}
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
    delete optionsSelected['page']
    delete optionsSelected['extraTitles']

    return Object.keys(optionsSelected).length
  }
}