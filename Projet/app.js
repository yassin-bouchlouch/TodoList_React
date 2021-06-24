// Composant : Tâche
class Task extends React.Component {
   

  render() {
      let class_name = 'task'
      class_name += this.props.done ? ' task-success' : ' task-info';

      return (
          <div className={class_name}>
              <span>{this.props.value}</span>
              <i className="close">&times;</i>
          </div>
      )
  }
}

// Application
class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
       taskList: []
    };
  }
  componentDidMount() {
    this.chargementDonnees();
  }
  chargementDonnees(){

    var dataList = null;
    
    // affichage de données par Ajax

    $.getJSON( "API/showtasks.php", 
    function( data ) {
      this.setState({ taskList: data});
    }.bind(this))
    .fail(function(jqXHR, textStatus, errorThrown) 
    {
       console.log(errorThrown);
   })
    ;
 
  }

  render() {
   
    let tasksArrayMap = this.state.taskList.map((task, i) => {
      return (
        <Task 
          key={i}
          value={task.taskName}
          done={task.done}
        />
      )
    })

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <h1> Quel est le plan pour aujourd'hui ?</h1>
            <form
              id="form-add"
              className="form-horizontal">
              <div className="input-group">
                <input type="text" id="addInput" className="form-control"  placeholder="Enterz une task..." />
                <div className="input-group-btn">
                  <button type="submit" className="btn btn-default">
                    <span className="glyphicon glyphicon-plus-sign"></span>
                  </button>
                </div>
              </div>
            </form>

            {tasksArrayMap}
                        
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));