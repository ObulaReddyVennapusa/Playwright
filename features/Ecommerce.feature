Feature: Ecommerce end to end
  @Regression
  Scenario: Place order
    Given  user login with the "kiran907@gmail.com" and "Test@123"
    When  user add the "ZARA COAT 3" to the cart
    Then  verify the "ZARA COAT 3" on checkout
    And  place the order by using "465","KiranReddy", "rahulshettyacademy"
    When order placed and confirm on ordersPage
    Then Verify order in the my ordersPage

      @validation
  Scenario: Error validation on login
    Given  user login to ecommerce2 with the "kiran907@gmail.com" and "Test@123"
    Then  validate the error message