import React from 'react'

import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/prism-light";
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import { darcula } from 'react-syntax-highlighter/styles/prism'

import './Syntax.css'

registerLanguage('jsx', jsx)

export default class Syntax extends React.Component {
  render () {
    let {
      children,
      className = '',
      style = {}
    } = this.props
    className += ' code'
    return (
      <div className={className} style={{...style}}>
        <SyntaxHighlighter
          language="jsx"
          style={darcula}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    )
  }
}