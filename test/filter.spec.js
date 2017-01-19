import React from 'react';
import {expect} from 'code';
import {shallow} from 'enzyme';
import {Filter} from '../src/filter';

describe('<Filter /> Component', () => {
    let renderedFilter, testProps;

    beforeEach(() => {
        testProps = {
            pizza: ["Sausage",
                "Cheese",
                "Pepperoni",
                "Hawaiian",
                "vegetable",
                "3 cheeSe",
                "macaroni",
                "Chicken",
                "Sausage and Pepperoni"],
            pageLoading: false
        };
        renderedFilter = shallow(<Filter {...testProps.pizza}/>);
    });

    it('should have panel', () => {
        expect(renderedFilter.props().className).to.equal('pizza-container col-sm-4');
    });

    it('should set pizza list', function () {
        renderedFilter.setState({pizzaList: testProps.pizza});
        expect(renderedFilter.state('pizzaList')).to.equal(testProps.pizza);
    });

    it('should have pizza list', function () {
        renderedFilter.setState({pizzaList: testProps.pizza,pageLoading: false});
        expect(renderedFilter.props().children.props.children[3].props.children[0].props.children).to.equal(testProps.pizza[0]);
    });


    describe('form elements',function () {

        //let formElement;

        beforeEach(function () {
            renderedFilter.setState({pageLoading: false,isSorted: false});
        });

        describe('fiter list', function () {

            it('should have textbox', function () {
                expect(renderedFilter.props().children.props.children[1].props.children.props.children.type).to.equal('input');
            });

            it('should filter list', function () {
                const filteredList  = ['Sausage and Pepperoni'];
                renderedFilter.setState({masterPizzaList: testProps.pizza});
                renderedFilter.props().children.props.children[1].props.children.props.children.props.onKeyUp({target: {value: 'and'}});
                expect(renderedFilter.state('pizzaList')).to.equal(filteredList);

            });
        });

        describe('sort list', function () {
            let sortElement;

            beforeEach(function () {
                sortElement = renderedFilter.props().children.props.children[2].props;
            });

            it('should button', function () {
                expect(sortElement.type).to.equal('button');
            });

            it('should sort list', function () {
                const sortedList = ["vegetable",
                    "Sausage and Pepperoni",
                    "Sausage",
                    "Pepperoni",
                    "macaroni",
                    "Hawaiian",
                    "Chicken",
                    "Cheese",
                    "3 cheeSe"];
                renderedFilter.setState({pizzaList: testProps.pizza});
                sortElement.onClick();
                expect(renderedFilter.state('pizzaList')).to.equal(sortedList);
            });
        });

    });


});
