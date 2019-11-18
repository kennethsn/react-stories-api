import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.scss';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
export default class ExampleComponent extends Component {
  static propTypes = {
    /** Description of prop "text". */
    text: PropTypes.string
  }
  static defaultProps = {
      text: "Hello World"
    }

  render() {
    const {
      text
    } = this.props

    return (
      <div className="test">
        Stories API: {text}
      </div>
    )
  }
}
