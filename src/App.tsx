import { createMemo } from "solid-js";
import {
	RouteDefinition,
	RouteSectionProps,
	Router,
	useLocation,
	useParams,
} from "@brendonovich/solidjs__router";

const routes = [
	{
		// won't be necessary with updated implementation
		path: "*unnecessaryMatch",
		component: (
			props: RouteSectionProps<unknown, "postPage" | "feedAndModal">,
		) => {
			const location = useLocation();
			const isPostPage = createMemo(
				(prev: boolean) => location.pathname.startsWith("/post") && prev,
				true,
			);

			return (
				<>{isPostPage() ? props.slots.postPage : props.slots.feedAndModal}</>
			);
		},
		slots: {
			feedAndModal: {
				children: [
					{
						component: (props: RouteSectionProps) => (
							<div>
								<p>Feed Implementation</p>
								<ul>
									<li>
										<a href="/post/1">Post 1</a>
									</li>
									<li>
										<a href="/post/2">Post 2</a>
									</li>
									<li>
										<a href="/post/3">Post 3</a>
									</li>
									<li>
										<a href="/post/4">Post 4</a>
									</li>
									<li>
										<a href="/post/5">Post 5</a>
									</li>
								</ul>
								{props.children}
							</div>
						),
						children: [
							{
								path: "/post/:postId",
								component: () => {
									const params = useParams();
									return <>Post Modal {params.postId}</>;
								},
							},
							{
								path: "/",
								component: () => "Feed Page",
							},
						],
					},
				],
			},
			postPage: {
				component: (props: RouteSectionProps) => <>{props.children}</>,
				children: [
					{
						path: "/post/:postId",
						component: () => {
							const params = useParams();
							return (
								<div>
									<p>
										<a href="/">Feed</a>
									</p>
									<span>Post Page {params.postId}</span>
								</div>
							);
						},
					},
				],
			},
		},
	},
] as RouteDefinition<any, any, any>;

export default function App() {
	return <Router>{routes}</Router>;
}
