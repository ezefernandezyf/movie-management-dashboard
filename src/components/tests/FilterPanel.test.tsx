import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FiltersPanel } from '../FiltersPanel/FiltersPanel';

describe('FiltersPanel', () => {
  it('toggles genres and calls onApply with filters', async () => {
    const user = userEvent.setup();
    const onApply = vi.fn();
    const onChange = vi.fn();
    render(
      <FiltersPanel availableGenres={['Drama', 'Comedia']} onApply={onApply} onChange={onChange} />,
    );

    await user.click(screen.getByText('Drama'));
    await user.click(screen.getByRole('button', { name: /Aplicar/i }));
    expect(onApply).toHaveBeenCalledTimes(1);
    const applied = onApply.mock.calls[0][0];
    expect(applied.genres).toEqual(['Drama']);
  });
});
