import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Home } from '.';

const handlers = [
    rest.get('https://jsonplaceholder.typicode.com/posts', async (request, response, context) => {
        return response(
            context.json([
                {
                    userId: 1,
                    id: 1,
                    title: 'title 1',
                    body: 'body 1',
                },
                {
                    userId: 1,
                    id: 2,
                    title: 'title 2',
                    body: 'body 2',
                },
                {
                    userId: 1,
                    id: 3,
                    title: 'title 3',
                    body: 'body 3',
                },
            ]),
        );
    }),
    rest.get('https://jsonplaceholder.typicode.com/photos', async (request, response, context) => {
        return response(
            context.json([
                {
                    url: 'img/img1.png',
                },
                {
                    url: 'img/img2.png',
                },
                {
                    url: 'img/img3.png',
                },
            ]),
        );
    }),
];
const server = setupServer(...handlers);

describe('<Home />', () => {
    beforeAll(() => {
        server.listen();
    });

    afterEach(() => {
        server.resetHandlers();
    });

    afterAll(() => {
        server.close();
    });

    it('should render search, posts and load more', async () => {
        render(<Home />);
        const noMorePosts = screen.getByText('Não existem posts');
        expect.assertions(3);
        await waitForElementToBeRemoved(noMorePosts);

        const search = screen.getByPlaceholderText('Type your search');
        expect(search).toBeInTheDocument();

        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('should search for posts', async () => {
        render(<Home />);
        const noMorePosts = screen.getByText('Não existem posts');
        expect.assertions(11);
        await waitForElementToBeRemoved(noMorePosts);

        const search = screen.getByPlaceholderText('Type your search');
        expect(search).toBeInTheDocument();

        expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'title 3' })).not.toBeInTheDocument();

        userEvent.type(search, 'title 1');
        expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'title 2' })).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'title 3' })).not.toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Search value: title 1' })).toBeInTheDocument();

        userEvent.clear(search);
        expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument();

        userEvent.type(search, 'teste');
        expect(screen.getByText('Não existem posts')).toBeInTheDocument();
    });

    it('should render more posts when button clicked', async () => {
        render(<Home />);
        const noMorePosts = screen.getByText('Não existem posts');
        await waitForElementToBeRemoved(noMorePosts);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'title 3' })).not.toBeInTheDocument();

        userEvent.click(button);
        expect(screen.queryByRole('heading', { name: 'title 3' })).toBeInTheDocument();
    });
});
