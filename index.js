"use strict"
import React,{Component} from "react";
import Stack from "./DataStructures/Stack";

const st = new Stack()

export function createStackNavigator(routeConfig){

    return class Navigator extends Component{

        constructor(props){
            super(props);

            this.__routes = routeConfig;
            this.__initialRoute = Object.keys(this.__routes)[0];
            this.__routeStack = new Stack();
            this.__visibleScreen = this.__routes[this.__initialRoute];
            this.__routeStack.push(this.__visibleScreen);

            this.push = this.push.bind(this);
            this.pop = this.pop.bind(this);

            this.state = {
                screen:this.paint()
            }
        }
    
        push(routeKey){
            this.__routeStack.push(this.__routes[routeKey]);
            this.reRender();
        }
    
        pop(){
            this.__routeStack.pop();
            this.reRender();
        }
    
        paint(){
            return this.__routeStack.findFirst();
        }
    
        reRender(){
            this.setState({
                screen:this.paint()
            })
        }
        
        render(){
            const renderScreen = this.state.screen;
            const navigationHelpers = {
                push:this.push,
                pop:this.pop
            }
            return React.createElement(renderScreen,{navigator:navigationHelpers},null);
        }
    
    }
}

const version = "1.0.0";
export default version;