import React, { Component } from 'react';
// import logo from './logo.svg';
import '../styles/App.css';

class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event)
  {
    this.setState({value: event.target.value});
  }

  handleSubmit(event)
  {
    /**
     * To prevent refresh, use event.preventDefault()
     */
    event.preventDefault();

    /**
     * Variable assignments.
     * Catch the value of the amount and
     * count the decimal place values
     */
    let amount = document.getElementById('amount-input').value;
    let hundredThousandth = Math.floor( (amount % 1000000) / 100000 );
    let tenThousandth     = Math.floor( (amount % 100000) / 50000 );
    let remTenThousandth  = Math.floor( (amount % 100000) / 10000 );
    let thousandth        = Math.floor( (amount % 10000) / 5000 );
    let remThousandth     = Math.floor( (amount % 10000) / 1000 );
    let hundredth         = Math.floor( (amount % 1000) / 500 );
    let remHundredth      = Math.floor( (amount % 1000) / 100 );
    let tenth             = Math.floor( (amount % 100) / 50 );
    let remTenth          = 0;
    let single            = Math.floor( (amount % 10) );



    /**
     * How many needed for ten thousandth amount.
     * Available fractions are 50K, 20K, and 10K
     */
    if(remTenThousandth === 9 || remTenThousandth === 4)
        remTenThousandth = '2x Rp20000';
    else if(remTenThousandth === 8 || remTenThousandth === 3)
        remTenThousandth = '1x Rp20000 <br/> 1x Rp10000';
    else if(remTenThousandth === 7 || remTenThousandth === 2)
        remTenThousandth = '1x Rp20000';
    else if(remTenThousandth === 6 || remTenThousandth === 1)
        remTenThousandth = '1x Rp10000';
    else if(remTenThousandth === 5 || remTenThousandth <= 0)
        remTenThousandth = 0;

    /**
     * How many needed for thousandth amount.
     * Available fractions are 5K, 2K, and 1K
     */
    if(remThousandth === 9 || remThousandth === 4)
        remThousandth = '2x Rp2000';
    else if(remThousandth === 8 || remThousandth === 3)
        remThousandth = '1x Rp2000 <br/> 1x Rp1000';
    else if(remThousandth === 7 || remThousandth === 2)
        remThousandth = '1x Rp2000';
    else if(remThousandth === 6 || remThousandth === 1)
        remThousandth = '1x Rp1000';
    else if(remThousandth === 5 || remThousandth <= 0)
        remThousandth = 0;

    /**
     * How many needed hundredth amount.
     * Available fractions are 500, 200, and 100
     */
    if(remHundredth === 9 || remHundredth === 4)
        remHundredth = '2x Rp200';
    else if(remHundredth === 8 || remHundredth === 3)
        remHundredth = '1x Rp200 <br/> 1x Rp100';
    else if(remHundredth === 7 || remHundredth === 2)
        remHundredth = '1x Rp200';
    else if(remHundredth === 6 || remHundredth === 1)
        remHundredth = '1x Rp100';
    else if(remHundredth === 5 || remHundredth <= 0)
        remHundredth = 0;
        
    if((remTenth >= 6 && remTenth <= 9) || (remTenth >= 1 && remTenth <= 4))
        remTenth = 'left Rp' + (remTenth * 10 + single);
    else if(remTenth === 5 || remTenth <= 0)
        remTenth = 0;


    if(Math.floor((amount % 100) > 50))
        remTenth = 'left Rp' + Math.floor( (amount % 100) - 50 );
    else if(Math.floor((amount % 100) === 50))
        remTenth = 0;
    else
        remTenth = 'left Rp' + Math.floor( (amount % 100) );
    
    let a = hundredThousandth + 'x Rp100000';
    let b = tenThousandth + 'x Rp50000';
    let rb = remTenThousandth;
    let c = thousandth + 'x Rp5000';
    let rc = remThousandth;
    let d = hundredth + 'x Rp500';
    let rd = remHundredth;
    let e = tenth + 'x Rp50';
    let ed = remTenth;

    let result =
        ((hundredThousandth !== 0) ? a + '<br/>' : '') +
        ((tenThousandth !== 0) ? b + '<br/>' : '') +
        ((remTenThousandth !== 0) ? rb + '<br/>' : '') +
        ((thousandth !== 0) ? c + '<br/>' : '') +
        ((remThousandth !== 0) ? rc + '<br/>' : '') +
        ((hundredth !== 0) ? d + '<br/>' : '') +
        ((remHundredth !== 0) ? rd + '<br/>' : '') +
        ((tenth !== 0) ? e + '<br/>' : '') +
        ((remTenth !== 0) ? ed : '');

    /**
     * Catch the result and assign the value
     * to the paragraph with id = result on the frontend.
     */
    document.getElementById('result').innerHTML = result;

    let form = document.getElementById('money');
    form.addEventListener("submit", this.handleSubmit, true);
  }

  render()
  {
    return (
      <div className="App">
        <form id="money" method="POST" onSubmit={this.handleSubmit}>
          <label><b>Enter Amount</b></label>
          <input type="text" name="message" id="amount-input" />
          <input type="submit" />
        </form>
        
        <label>Your input: </label>
        <p><span id='result'></span></p>
      </div>
    );
  }
}

export default App;
