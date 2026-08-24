import Link from "next/link";

type Topic = {
    id: string;
    title: string;
    topicNumber: number;
};

type Props = {
    topic: Topic;
};

export function TopicCard({
    topic,
}: Props) {
    return (
        <Link
            href={`/learn/topics/${topic.id}`}
            className="group relative overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/40"
        >
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-200/30 blur-2xl" />

            <div className="relative">
                <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-violet-700 shadow-sm ring-1 ring-violet-100">
                        {String(topic.topicNumber).padStart(2, "0")}
                    </div>

                    <span className="rounded-full border border-violet-100 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-600">
                        Topic
                    </span>
                </div>

                <h3 className="mt-6 text-lg font-black tracking-tight text-slate-950">
                    {topic.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Topic {topic.topicNumber}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-violet-100 pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
                        Explore topic
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white transition-all group-hover:translate-x-1 group-hover:bg-indigo-600">
                        →
                    </span>
                </div>
            </div>
        </Link>
    );
}