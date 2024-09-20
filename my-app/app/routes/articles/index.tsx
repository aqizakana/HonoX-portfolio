import { FC } from "hono/jsx";
import { createRoute } from "honox/factory";
import { Article, } from "../../lib/schema";
import { getArticles } from "../../lib/db";
import { css } from "hono/css";

type Props = {
    articles: Article[];
};

const titleClass = css`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const cards = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;


const Page: FC<Props> = ({ articles }) => {
    return (
        <body>
            <div>
                <h1 class={titleClass}>Articles</h1>
                <ul class={cards}>
                    {articles.map((article) => (
                        <li class={"card"}>
                            <a href={`/articles/${article.id}`}>
                                {article.title}

                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </body>
    );
};

export default createRoute(async (c) => {
    const articles = await getArticles();
    return c.render(<Page articles={articles} />);
});