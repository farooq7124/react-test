import React, {Component} from 'react';

import {getPizzas} from './services/pizzaService';

function getPizzaList() {
    return getPizzas()
        .then(function (response) {
            self.setState({pizzaList: response.pizzas,masterPizzaList: response.pizzas, pageLoading: !(response.pizzas.length)});
        });
}

function filterListData(pizzaList, event) {
    return pizzaList.filter(function (element) {
       return element.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
    });
}

function sortAndReverse(list,order) {
    list.sort(function(elem1, elem2){
        if(elem1.toLowerCase() < elem2.toLowerCase()) return -1;
        if(elem1.toLowerCase() > elem2.toLowerCase()) return 1;
        return 0;
    });
    !order ? list.reverse() : list;
    return list;
}

export class Filter extends Component {

    constructor() {
        super();
        this.state = {
            pizzaList: [],
            masterPizzaList : [],
            ascDefault: false,
            pageLoading: true,
            isSorted: false
        };
    }

    componentDidMount() {
        self = this;
        getPizzaList();
    }

    filterData(event) {
        this.state.pizzaList = this.state.masterPizzaList;
        const updatedFilteredList = filterListData(this.state.pizzaList, event);
        this.setState({pizzaList: updatedFilteredList});
    }

    sortData() {
        !this.state.isSorted ? this.setState({pizzaList: sortAndReverse(this.state.pizzaList,this.state.ascDefault)}) : '';
        this.state.ascDefault = !this.state.ascDefault;
        this.state.isSorted = !this.state.isSorted;
    }


    render() {
        const pageLoading = this.state.pageLoading;

        return (
            <div className="pizza-container col-sm-4">
            {
                pageLoading ?
                        <h3>Loading</h3> :
                        <div className="form-inline">
                            <h2>React List Sort</h2>
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control" onKeyUp={this.filterData.bind(this)} />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.sortData.bind(this)}
                            >
                                Sort
                            </button>

                            <ul className="list-group">
                                {
                                    this.state.pizzaList.map(function(item, index) {
                                        return (<li key={index} className="list-group-item">{item}</li>)
                                    })
                                }
                            </ul>
                        </div>
            }
            </div>

        );
    }
}
