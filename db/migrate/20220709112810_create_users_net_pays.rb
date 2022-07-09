class CreateUsersNetPays < ActiveRecord::Migration[7.0]
  def change
    create_table :users_net_pays do |t|
      t.string :firstname
      t.string :lastname
      t.integer :age
      t.string :email
      t.string :occupation

      t.timestamps
    end
  end
end
