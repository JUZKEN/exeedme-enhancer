import React from 'react';
import storage from '../../shared/storage';
import { render } from 'react-dom';
import './Popup.css';

export default class Popup extends React.Component {

  state = {
    options: "",
  }

  async componentDidMount() {
    const storageOptions = await storage.getAll();
    this.setState(({ options }) => ({
      options: { ...options, ...storageOptions },
    }));
    console.log(storageOptions);
  };

  getUpdateOption = option => newValue => {
    this.setState(({ options }) => {
      const updatedOption = { [option]: newValue }
      storage.set(updatedOption)
      return {
        options: {
          ...options,
          ...updatedOption
        }
      }
    })
  }

  handleSwitchOption = option => () => {
    const updateOption = this.getUpdateOption(option)
    const newValue = !this.state.options[option]
    updateOption(newValue)
  }

  getSwitchProps = option => ({
    key: option,
    checked: this.state.options[option],
    onClick: this.handleSwitchOption(option)
  });

  render() {
    return (
      <div className="wrapper">
        <h2>Settings</h2>
        <div className="options">
          <div className="option">
            <h3>Auto-accept</h3>
            <label className="switch">
              <input type="checkbox" name="autoaccept" id="autoaccept-switch" onClick={this.handleSwitchOption("autoAccept")} defaultChecked={this.state.options["autoAccept"]} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    );
  }
};