import React from 'react';
import App from './app.js'
import TextBox from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';

export default class Login extends React.Component
{
    constructor()
    {
        super()
        this.style =
        {
            body : 
            {
                backgroundColor : '#ecf0f1',                
                height: '100%',
            },
            login_box :
            {
                position: 'relative',
                margin:'auto',
                top: '30%',
                width: '400px',
                height: '200px',
            }
        }  
        this.state = 
        {
            kullanici: '',
            sifre: ''
        }  
        this.core = App.instance.core;    

        this.onLoginClick = this.onLoginClick.bind(this)
        this.textValueChanged = this.textValueChanged.bind(this)
    }
    textValueChanged(e) 
    {      
        if(e.element.id == 'Kullanici')
        {
            this.setState({kullanici: e.value});
        } 
        else if(e.element.id == 'Sifre')
        {
            this.setState({sifre: e.value});
        }
    }
    onLoginClick(e)
    {
        if(this.state.kullanici == '' && this.state.sifre == '')
        {
            return;
        }
        this.core.socket.emit('login',[this.state.kullanici,this.state.sifre],async (data) =>
        {
            if(data.length > 0)
            {
                window.sessionStorage.setItem('auth',data[0].SHA)
                App.instance.setState({logined:true});
            }
            else
            {
                console.log('Kullanıcı yada şifre yanlış')
            }
        });
    }
    render()
    {
        return (
            <div style={this.style.body}>
                <div className="card" style={this.style.login_box}>
                   <div className="card-header">Login</div>
                   <div className="card-body">
                        <div className="dx-field">
                            <div className="dx-field-label">Kullanıcı Adı</div>
                            <div className="dx-field-value">
                                <TextBox id="Kullanici" showClearButton={true} height='fit-content' valueChangeEvent="keyup" onValueChanged={this.textValueChanged} />
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Şifre</div>
                            <div className="dx-field-value">
                                <TextBox id="Sifre" mode="password" showClearButton={true} height='fit-content' valueChangeEvent="keyup" onValueChanged={this.textValueChanged} />
                            </div>
                        </div>
                        <div className="dx-field">
                            <Button
                                width={'100%'}
                                height='fit-content'
                                text="Login"
                                type="default"
                                stylingMode="contained"
                                onClick={this.onLoginClick}
                            />
                        </div>
                   </div>
                </div>
            </div>
        )
    }
}