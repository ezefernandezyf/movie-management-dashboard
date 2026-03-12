import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../SearchBar/SearchBar';


describe('SearchBar', () => {
    it('calls onChange immediately and onSearch after debounce', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        const onSearch = vi.fn();

        render(<SearchBar onChange={onChange} onSearch={onSearch} debounceMs={150} />);

        await user.type(screen.getByRole('searchbox'), 'abc');
        expect(onChange).toHaveBeenCalled();
        await new Promise((r) => setTimeout(r, 200));
        expect(onSearch).toHaveBeenCalledWith('abc');
    });
});