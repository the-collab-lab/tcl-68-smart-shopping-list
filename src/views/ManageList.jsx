export function ManageList() {
	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<section>
				<form>
					<label htmlFor="item-name">
						Item Name
						<input id="item-name" name="item-name" type="text"></input>
					</label>
					<label htmlFor="next-purchase">
						Next Purchase
						<select id="next-purchase" name="next-purchase">
							<option value="">Select Next Purchase Date</option>
							<option value="7">One Week</option>
							<option value="14">Two Weeks</option>
							<option value="30">One Month</option>
						</select>
					</label>
					<button type="submit">Add Item</button>
				</form>
			</section>
		</>
	);
}
