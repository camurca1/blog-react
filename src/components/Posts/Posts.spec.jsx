import { render, screen } from '@testing-library/react';
import { Posts } from '.';

const props = {
    posts: [
        {
            id: 1,
            title: 'Title text',
            body: 'Body text',
            cover: 'img/img.png',
        },
    ],
};

describe('<Posts />', () => {
    it('should render posts', () => {
        render(<Posts {...props} />);
        expect(screen.getAllByRole('heading', { name: 'Title text' })).toHaveLength(1);
        expect(screen.getAllByRole('img', { name: 'Title text' })).toHaveLength(1);
        expect(screen.getAllByText('Body text')).toHaveLength(1);
    });

    it('should not render posts', () => {
        render(<Posts />);
        expect(screen.queryByRole('heading', { name: 'Title text' })).not.toBeInTheDocument();
    });
});
