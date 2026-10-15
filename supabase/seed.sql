insert into public.articles(title,slug,excerpt,content,category,tags,type,status,featured,published_at,author_id)
values
('Mine Planning Beyond the Schedule','mine-planning-beyond-the-schedule','Why a mine plan is not merely a sequence of tonnes, but a decision system.','# Mine Planning Beyond the Schedule

A mine schedule is often treated as the final answer. In practice, it is the visible result of assumptions about geology, equipment, access, blending and risk.','Mine Planning',array['planning','scheduling'],'deep_dive','published',true,now(),(select id from auth.users order by created_at limit 1)),
('Where AI Can Help Mine Planners','ai-for-mine-planners','A practical view of AI as a planning copilot.','# Where AI Can Help Mine Planners

AI can reduce friction around repetitive analysis, documentation and scenario comparison.','AI in Mining',array['AI','planning'],'field_note','published',false,now(),(select id from auth.users order by created_at limit 1)),
('What Nickel Laterite Taught Me About Planning','learning-from-nickel-laterite','Reflections on blending, variability and operational reality.','# What Nickel Laterite Taught Me About Planning

Nickel laterite planning makes variability impossible to ignore.','Nickel',array['nickel','blending'],'field_note','published',false,now(),(select id from auth.users order by created_at limit 1))
on conflict(slug) do nothing;
