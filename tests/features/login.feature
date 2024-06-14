@Sample
Feature: Browserstack Sample App

  Scenario Outline: As a user, I can log into the secure area

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a flash message saying <message>

    Examples:
      | username | password             | message   |
      | tomsmith | SuperSecretPassword! | Logging in |
      

  Scenario Outline: Second Scenario

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a flash message saying <message>

    Examples:
      | username | password             | message   |
      | foobar   | barfoo               | Logging in |