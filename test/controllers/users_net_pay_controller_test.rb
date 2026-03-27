require "test_helper"

class UsersNetPayControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get users_net_pay_index_url
    assert_response :success
  end
end
