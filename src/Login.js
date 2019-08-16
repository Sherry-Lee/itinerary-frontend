import React, {Component} from 'react'
import { FormGroup } from 'fundamental-react/InputGroup';
import { FormItem, FormLabel } from 'fundamental-react/Forms';
import { Button } from 'fundamental-react/Button';
const userInfos = [{inumber: "I330955", password: "123456", department: "DBS", name: "sherry"}, {inumber: "I330956", password: "123456", department: "DBS", name: 'lealhom'}, {inumber: "I330957", password: "123456", department: "DBS", name: 'yangyang'}];
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {inumber: '', password: '', depart: '', uname: ''};
    }
    validateLogin() {
        userInfos.map((item, index) => {
            if(this.state.inumber === item.inumber && this.state.password === item.password) {
                this.props.history.push({pathname: '/index', state:{inumber: this.state.inumber, depart: item.department, uname: item.name }});
            }
            return true;
        })
    }
    userChange(e){
        this.setState({ inumber : e.target.value })
    }

    passwordChange(e){
        this.setState({ password : e.target.value })
    }

    render() {
        return (
            <div className="page-login">
                <h1 className="login-title">Welcome to Itinerary</h1>
                <FormGroup>
                    <FormLabel>
                        Enter your inumber
                    </FormLabel>
                    <FormItem>
                        <input
                            placeholder="Enter your inumber..." 
                            type = 'text'
                            onChange={this.userChange.bind(this)}
                        />
                    </FormItem>
                </FormGroup>
                <br />
                <FormGroup>
                    <FormLabel>
                        Enter your password
                    </FormLabel>
                    <FormItem>
                        <input
                           placeholder="Enter your password..."
                           type='password'
                           onChange={this.passwordChange.bind(this)}
                        />
                    </FormItem>
                </FormGroup>
                <Button option="emphasized" className="submit-login" onClick={this.validateLogin.bind(this)}>Submit</Button>
            </div>
        )
    }
}

export default Login