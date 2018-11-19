import {
  AdMobBanner,
  FacebookAds
} from 'expo'
import React from 'react'
import {
  View
} from 'react-native'

export default class AdBanner extends React.Component {
  render () {
    // return (
    //   <View style={[this.props.styles, {position: 'absolute', left:0, right: 0, bottom:0}]}>
    //     <FacebookAds.BannerView
    //       placementId="720928951616342_720929011616336"
    //       type="standard"
    //       onPress={() => console.log('click')}
    //       onError={(err) => console.log('error', err)}
    //     />
    //   </View>
    // )


    return (
    <View style={[this.props.styles, {position: 'absolute', left:0, right: 0, bottom:0}]}>
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID="ca-app-pub-1684745089786714/3120620344"
        onDidFailToReceiveAdWithError={(e) => {}} />
    </View>
    )
  }
}