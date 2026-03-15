import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../Pagination/Pagination';

describe('Pagination', () => {
  it('renders pages and triggers onPageChange', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} siblingCount={1} />,
    );

    expect(screen.getByRole('button', { name: '5' })).toHaveAttribute('aria-current', 'page');

    await user.click(screen.getByRole('button', { name: '6' }));
    expect(onPageChange).toHaveBeenCalledWith(6);

    await user.click(screen.getByLabelText('Anterior'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
