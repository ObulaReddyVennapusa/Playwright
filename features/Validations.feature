Feature: Ecommerce2 end to end

  @validation
  Scenario Outline: Error validation on login
    Given  user login to ecommerce2 with the "<username>" and "<Password>"
    Then  validate the error message

    Examples:
        | username            | Password  |
        | kiran907@gmail.com  | Test@123  | 
        | kiran090@gmail.com  | test@344  |