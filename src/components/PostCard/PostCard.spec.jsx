import { render, screen } from "@testing-library/react"
import { PostCard } from "."
import { postCardPropsMock } from "./mock"

const props = postCardPropsMock;

describe('<PostCard />', () => {
    it('should render a PostCard', () => {
        render(<PostCard {...props}/>);

        const image = screen.getByRole('img', {name: props.title});
        const heading = screen.getByRole('heading', {name: props.title});
        const body = screen.getByText('Body text');

        expect(image).toHaveAttribute('src', props.cover);
        expect(heading).toBeInTheDocument();
        expect(body).toBeInTheDocument();
    })
})