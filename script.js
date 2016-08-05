/**
 * Created by Travis on 8/4/2016.
 */
$(document).ready(function(){
    (function(){

        var Leaderboard = React.createClass({

            getInitialState : function(){
                return{
                    mode : "alltime",
                    json : [],
                    headerText : "All Time Leaders"
                }
            },

            getJson : function(){
                if(this.state.mode == "recent"){
                    this.componentDidMount("https://fcctop100.herokuapp.com/api/fccusers/top/recent");
                } else if(this.state.mode == "alltime"){
                    this.componentDidMount("https://fcctop100.herokuapp.com/api/fccusers/top/alltime");
                }
                this.render();
            },

            componentDidMount : function(url){
                this.serverRequest = $.get(url, function (result) {
                    var campers = result;
                    this.setState({
                        json : campers
                    });
                }.bind(this));
            },

            componentWillUnmount: function() {
                this.serverRequest.abort();
            },

            switchMode : function(){
                if(this.state.mode == "recent"){
                    this.setState({mode : "alltime", headerText : "All Time Leaders"});
                } else if(this.state.mode == "alltime"){
                    this.setState({mode : "recent", headerText : "Recent Leaders"});
                }
                this.getJson();
            },

            eachCamper : function(text, i){
                return(
                    <Camper index = {i} key = {i} camperInfo = {text}>{i + 1}</Camper>
                )
            },

            render : function(){
                console.log("JSON STATE", this.state.json);
                return(
                    <div>
                        <div className = "top row">
                            <h2 className = "col-xs-8">FCC Leaderboard</h2>
                            <h3 className = "col-xs-4">{this.state.headerText}</h3>
                        </div>
                        <div className = "button-row row">
                        <button className = "refresh btn col-xs-6" onClick = {this.getJson}>Refresh</button>
                        <button className = "switch btn col-xs-6" onClick = {this.switchMode}>Switch View</button>
                        </div>
                        <div className = "headings row">
                            <h4 className = "col-xs-1">Rank</h4>
                            <h4 className = "col-xs-7">Username</h4>
                            <h6 className = "col-xs-2">Recent Score</h6>
                            <h6 className = "col-xs-2">All Time Score</h6>
                        </div>
                        {this.state.json.map(this.eachCamper)}
                    </div>
                )
            }
        });

        var Camper = React.createClass({
            render : function(){
                return(
                    <div className = "camper-body">
                    <div className = "row">
                        <h3 className = "camper-rank col-xs-1">{this.props.children}</h3>
                        <img className = "camper-photo img-responsive col-xs-1" src = {this.props.camperInfo.img}/>
                        <h3 className = "camper-name col-xs-6">{this.props.camperInfo.username}</h3>
                        <p className = "camper-recent col-xs-2">{this.props.camperInfo.recent}</p>
                        <p className = "camper-alltime col-xs-1">{this.props.camperInfo.alltime}</p>
                    </div>
                    </div>
                );
            }
        });
        

        ReactDOM.render(<div>
            <Leaderboard/>
        </div>, document.getElementById("content"));
        
    })();
});