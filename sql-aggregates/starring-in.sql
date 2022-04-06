select "name" as "genres",
  count("genres") as "total"
  from "genres"
  join "filmGenre" using ("genreId")
  join "films" using ("filmId")
  join "castMembers" using ("filmId")
  join "actors" using ("actorId")
  where "actors"."firstName" = 'Lisa'
  and "actors"."lastName" = 'Monroe'
group by "genres"."genreId";
