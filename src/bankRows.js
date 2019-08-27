import React, {Component} from 'react';
import './bankRows.css';
class BankRow extends Component{
    viewBank(){
        window.location.href="http://www.google.com"
    }
    clickBank(e){
      console.log(e.target);
      e.target.style.color = "#ff0000";
    }
    render(){
        return <table className="tabs" key={this.props.bank.id}>
        <tbody>
        <tr>
          <td>
          <h3>{this.props.bank.bank_name}: </h3>
          
          {this.props.bank.ifsc}
            <p>{this.props.bank.city}</p>
            Address: {this.props.bank.address} | Branch: {this.props.bank.branch} | District: {this.props.bank.district} | State: {this.props.bank.state}
            <p>
              <div>
                <h5>Click on this heart to make this your favorite bank: 
                <i 
                    onClick={this.clickBank.bind(this)}
                    id="gg"
                    class="fas fa-heart faclass"
                  />
                </h5>
              
                </div>
            
            <input type="button"
            className="newb"
            onClick={this.viewBank.bind(this)} 
            value="Go to Website"/>
            </p>
          </td>
        </tr>

        </tbody>

      </table>
    }
}

export default BankRow;