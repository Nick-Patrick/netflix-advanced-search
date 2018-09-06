import React from 'react';
import {
  ScrollView,
  TouchableHighlight,
  View,
  Text,
  Picker,
  TextInput
} from 'react-native';
import { WebBrowser } from 'expo';
import styles from '../styles/SearchStyles'
import CustomHeader from '../components/CustomHeader'
import { Ionicons } from '@expo/vector-icons'

import SearchButton from '../components/Search/SearchButton'
import MediaTypeButtonGroup from '../components/Search/MediaTypeButtonGroup'
import qs from 'qs'

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  initialState = {
    showTypeAllActive: true,
    showTypeMoviesActive: false,
    showTypeTVActive: false,
    selectedMediaType: 'Any',
    selectedGenreId: '',
    selectedRecentlyAddedDuration: '',
    selectedYearFrom: '',
    selectedYearTo: new Date().getFullYear(),
    selectedRatingMin: '',
    selectedRatingMax: 100,
    selectedKeywords: ''
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
    return (
      <View style={styles.formInputContainer}>
        <Text style={styles.formInputLabel}>{label}</Text>
        <Picker 
          selectedValue={state}
          style={styles.dropdown}
          onValueChange={onValueChange}>
          { 
            data.map(item => {
              return <Picker.Item
                label={item.label}
                key={item.id} 
                value={item.id}/>
            })
          }
        </Picker>
      </View>
    )
  }

  renderYearsDropdown () {
    const currentYear = new Date().getFullYear()
    const yearsFrom = []
    const yearsTo = []
    const onFromValueChange = (selectedYearFrom) => this.setState({ selectedYearFrom })
    const onToValueChange = (selectedYearTo) => this.setState({ selectedYearTo })

    for (var i = 1950; i <= currentYear; i++) {
      if (i === 1950) yearsFrom.push({ label: 'Any', id: '' })
      yearsFrom.push({ label: i.toString(), id: i })
    }
    for (var i = currentYear; i >= this.state.selectedYearFrom; i--) yearsTo.push({ label: i.toString(), id: i })

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
    const onValueChange = (selectedGenreId) => this.setState({ selectedGenreId })
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
    const onValueChange = (selectedRecentlyAddedDuration) => this.setState({ selectedRecentlyAddedDuration })
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
    const setState = (type) => this.setState({
      selectedMediaType: type,
      showTypeAllActive: type === 'Any',
      showTypeMoviesActive: type === 'Movie',
      showTypeTVActive: type === 'Series'
    })

    return <MediaTypeButtonGroup 
      onPress={setState}
      showTypeAllActive={this.state.showTypeAllActive}
      showTypeMoviesActive={this.state.showTypeMoviesActive}
      showTypeTVActive={this.state.showTypeTVActive}
    />
  }

  onSearchPress () {
    const qsParams = {
      genreId: this.state.selectedGenreId,
      countryId: this.state.selectedCountryId,
      startYear: this.state.selectedYearFrom,
      endYear: this.state.selectedYearTo,
      query: this.state.selectedKeywords,
      recentlyAdded: this.state.selectedRecentlyAddedDuration,
      mediaType: this.state.selectedMediaType,
      minImdbRating: this.state.selectedRatingMin,
      maxImdbRating: this.state.selectedRatingMax
    }

    const apiEndpoint = `https://us-central1-whatsonnetflix-991e9.cloudfunctions.net/netflixAdvancedSearch?${qs.stringify(qsParams)}`
    console.log(apiEndpoint)
    // fetch(apiEndpoint, {
    //   method: "GET",
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(resp => resp.json())
    // .then(json => {
    //   console.log('we have json', json)
    // })
  }

  renderSearchArea () {
    return <SearchButton 
      onResetPress={() => { this.setState(this.initialState)}}
      onSearchPress={this.onSearchPress.bind(this)}
    />
  }
}