class RemoveStringFromMessages < ActiveRecord::Migration[5.0]
  def change
    remove_column :messages, :string, :string
  end
end
