import {VoteComponent} from './vote.component';
import {beforeEach} from 'selenium-webdriver/testing';

describe('VoteComponent', () => {

  // Arrange: initialise an instance of the system under test
  let component: VoteComponent;

  beforeEach(() => {
    component = new VoteComponent();
  })

  it('should increment totalVotes when up voted', function () {
    // Act: calling a method or function to change state of system
    component.upVote();
    // Assertion: the boolean expression being tested
    expect(component.totalVotes).toBe(1);
  });


  it('should decrement totalVotes when up voted', function () {
    // Arrage: initialise an instance of the system under test
    // Act: calling a method or function to change state of system
    component.downVote();
    // Assertion: the boolean expression being tested
    expect(component.totalVotes).toBe(-1);
  });
})
