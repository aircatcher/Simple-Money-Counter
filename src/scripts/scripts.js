import React, { Component } from 'react';
// import logo from './logo.svg';
import '../styles/styles.scss'

class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {value: ''};

    this.inputFocus = this.inputFocus.bind(this);
    this.inputFocusOut = this.inputFocusOut.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }

  inputFocus()
  {
    const elm = document.getElementsByClassName('helper')[0];
    elm.style.transform = 'translate(1em, -0.8em) scale(0.6)';
  }

  inputFocusOut()
  {
    const helper = document.getElementsByClassName('helper')[0];
    if(this.amount === null || this.amount === '')
    {
      helper.style.transform = 'translate(8%, -20%) scale(1)';
    }
  }

  /**
   * Variable assignments.
   * Catch the value of the amount and
   * count the decimal place values
   */
  varInit()
  {
    this.amount = document.getElementById('amount-input').value;
    this.indexJoin();

    this.hundredThousandth = (this.amount - (this.amount % 100000)) / 100000;
    this.tenThousandth     = Math.floor( (this.amount % 100000) / 50000 );
    this.remTenThousandth  = Math.floor( (this.amount % 100000) / 10000 );
    this.thousandth        = Math.floor( (this.amount % 10000) / 5000 );
    this.remThousandth     = Math.floor( (this.amount % 10000) / 1000 );
    this.hundredth         = Math.floor( (this.amount % 1000) / 500 );
    this.remHundredth      = Math.floor( (this.amount % 1000) / 100 );
    this.tenth             = Math.floor( (this.amount % 100) / 50 );
    this.remTenth          = 0;
    this.single            = Math.floor( (this.amount % 10) );
  }

  /**
   * How many needed for ten thousandth amount.
   * Available fractions are 50K, 20K, and 10K
   */
  remainderA()
  {
    if(this.remTenThousandth === 9 || this.remTenThousandth === 4)
      this.remTenThousandth = '2x Rp20000';
    else if(this.remTenThousandth === 8 || this.remTenThousandth === 3)
      this.remTenThousandth = '1x Rp20000 <br/> 1x Rp10000';
    else if(this.remTenThousandth === 7 || this.remTenThousandth === 2)
      this.remTenThousandth = '1x Rp20000';
    else if(this.remTenThousandth === 6 || this.remTenThousandth === 1)
      this.remTenThousandth = '1x Rp10000';
    else if(this.remTenThousandth === 5 || this.remTenThousandth <= 0)
      this.remTenThousandth = 0;
  }

  /**
   * How many needed for thousandth amount.
   * Available fractions are 5K, 2K, and 1K
   */
  remainderB()
  {
    if(this.remThousandth === 9 || this.remThousandth === 4)
      this.remThousandth = '2x Rp2000';
    else if(this.remThousandth === 8 || this.remThousandth === 3)
      this.remThousandth = '1x Rp2000 <br/> 1x Rp1000';
    else if(this.remThousandth === 7 || this.remThousandth === 2)
      this.remThousandth = '1x Rp2000';
    else if(this.remThousandth === 6 || this.remThousandth === 1)
      this.remThousandth = '1x Rp1000';
    else if(this.remThousandth === 5 || this.remThousandth <= 0)
      this.remThousandth = 0;
  }

  /**
   * How many needed hundredth amount.
   * Available fractions are 500, 200, and 100
   */
  remainderC()
  {
    if(this.remHundredth === 9 || this.remHundredth === 4)
      this.remHundredth = '2x Rp200';
    else if(this.remHundredth === 8 || this.remHundredth === 3)
      this.remHundredth = '1x Rp200 <br/> 1x Rp100';
    else if(this.remHundredth === 7 || this.remHundredth === 2)
      this.remHundredth = '1x Rp200';
    else if(this.remHundredth === 6 || this.remHundredth === 1)
      this.remHundredth = '1x Rp100';
    else if(this.remHundredth === 5 || this.remHundredth <= 0)
      this.remHundredth = 0;
  }

  remainderD()
  {
    if((this.remTenth >= 6 && this.remTenth <= 9) || (this.remTenth >= 1 && this.remTenth <= 4))
      this.remTenth = 'left Rp' + (this.remTenth * 10 + this.single);
    else if(this.remTenth === 5 || this.remTenth <= 0)
      this.remTenth = 0;

    const am = this.amount % 100;
    if(Math.floor(am) > 50)
      this.remTenth = 'left Rp' + Math.floor((am) - 50);
    else if(Math.floor(am) === 50 || Math.floor(am) === 0)
      this.remTenth = 0;
    else if(Math.floor(am) > 0 && Math.floor(am) < 50)
      this.remTenth = 'left Rp' + Math.floor(am);

  }

  indexJoin()
  {
    if(this.amount.indexOf('Rp') === 0)
      this.amount = this.amount.split('Rp').join('');
    if(this.amount.indexOf('.') !== -1)
      this.amount = this.amount.split('.').join('');
  }

  inpuValidation()
  {
    if(this.result === null || this.result === '')
      this.result = 'Please input the amount ...';
    if(this.amount.indexOf(',') !== -1)
      this.result = 'Invalid separator "comma", please check it again';
  
    if(document.getElementById('amount-input').split('Rp')[1] === '' ||
       document.getElementById('amount-input').split('Rp')[1] === ' ')
      this.result = 'Missing value of the amount, please check it again';
    else
      this.amount = this.amount.split('Rp').join('Rp ');
    
    if(this.amount.indexOf('Rp') > 0)
      this.result = 'Character Rp in wrong position, please check it again'
    if(this.amount.indexOf('Rp ') === 0)
    {
      if(this.amount.split('Rp ').includes(' '))
        this.result = 'Invalid separator "space", please check it again';
    }
    else if(this.amount.indexOf(' ') > 2)
      this.result = 'Invalid separator "space", please check it again';
  }


  handleForm(event)
  {
    /**
     * To prevent refresh, use event.preventDefault()
     */
    event.preventDefault();

    this.varInit();
    this.remainderA();
    this.remainderB();
    this.remainderC();
    this.remainderD();
    
    this.a = this.hundredThousandth + 'x Rp100000';
    this.b = this.tenThousandth + 'x Rp50000';
    this.rb = this.remTenThousandth;
    this.c = this.thousandth + 'x Rp5000';
    this.rc = this.remThousandth;
    this.d = this.hundredth + 'x Rp500';
    this.rd = this.remHundredth;
    this.e = this.tenth + 'x Rp50';
    this.ed = this.remTenth;

    this.result =
      ((this.hundredThousandth !== 0) ? this.a + '<br/>' : '') +
      ((this.tenThousandth !== 0) ? this.b + '<br/>' : '') +
      ((this.remTenThousandth !== 0) ? this.rb + '<br/>' : '') +
      ((this.thousandth !== 0) ? this.c + '<br/>' : '') +
      ((this.remThousandth !== 0) ? this.rc + '<br/>' : '') +
      ((this.hundredth !== 0) ? this.d + '<br/>' : '') +
      ((this.remHundredth !== 0) ? this.rd + '<br/>' : '') +
      ((this.tenth !== 0) ? this.e + '<br/>' : '') +
      ((this.remTenth !== 0) ? this.ed : '');

    

    // if(this.result.indexOf('NaN') !== -1)
    //   this.result = 'You have error(s) on your input, please check it again';

    /**
     * Catch the result and assign the value
     * to the paragraph with id = result on the frontend.
     */
    document.getElementById('result').innerHTML = this.result;

    this.form = document.getElementById('money');
    this.form.addEventListener("submit", this.handleSubmit, true);
  }

  render()
  {
    return (
      <div className="App">
        <div className="main-container">
          <form id="money" method="POST" onSubmit={this.handleForm}>
            {/* <div className="svgContainer">
              {this.svgYeti()}
            </div> */}
            <label><b>Enter Amount</b></label>
            <div className="inputGroup inputGroup1">
              {/* <input type="email" id="loginEmail" maxLength="254" /> */}
              <input type="text" name="message" id="amount-input" onFocus={this.inputFocus} onBlur={this.inputFocusOut} /> {/* onKeyUp="this.value=this.value.replace(/[^0-9.]/g,'')" */}
              <p className="helper helper1">Input amount of money ...</p>
              <button type='submit' id='submit'>Submit</button>
            </div>
          </form>
          <div id='res-container'>
            <label htmlFor="result">Result: </label>
            <span id='result'>Please input the amount ...</span>
          </div>
          <div className="copyright">
            Made by <a href="https://ferickandrew.com" target="_blank" rel="noopener noreferrer">Ferick Andrew</a> with <a href="http://reactjs.org" target="_blank" rel="noopener noreferrer">React</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
