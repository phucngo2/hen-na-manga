import { gql } from "@apollo/client";

export const GET_MANGA_ADMIN = gql`
    query getManga($mangaId: ID!) {
        getManga(mangaId: $mangaId) {
            id
            code
            name
            alias
            language
            artist
            group
            tags
            category
            parodies
            characters
            pages {
                pageNumber
                pageSrc
            }
        }
    }
`;

export const GET_MANGA = gql`
    query getMangaDetail($mangaCode: Int!) {
        getMangaDetail(mangaCode: $mangaCode) {
            id
            code
            name
            alias
            language
            artist
            group
            tags
            category
            parodies
            characters
            uploadedAt
            pages {
                pageNumber
                pageSrc
            }
            coverImgSrc
            isFavorited
            favoriteCount
        }
    }
`;

// export const GET_MANGA_PAGE = gql`
//     query getMangaPage($mangaCode: Int!, $page: Int) {

//     }
// `;

export const PAGINATE_MANGA_ADMIN = gql`
    query paginateManga($page: Int!, $limit: Int!, $keyword: String) {
        paginateManga(page: $page, limit: $limit, keyword: $keyword) {
            mangaCount
            mangas {
                id
                code
                name
                viewCount
                coverImgSrc
            }
        }
    }
`;

export const PAGINATE_MANGA = gql`
    query paginateManga($page: Int!, $limit: Int!, $keyword: String) {
        paginateManga(page: $page, limit: $limit, keyword: $keyword) {
            mangaCount
            mangas {
                code
                name
                coverImgSrc
            }
        }
    }
`;

export const LIST_POPULAR_MANGA = gql`
    query {
        listPopularMangas {
            id
            code
            name
            coverImgSrc
        }
    }
`;

export const INSERT_MANGA = gql`
    mutation insertManga(
        $name: String!
        $alias: String
        $language: String!
        $artist: String!
        $group: String
        $tags: [String]
        $category: String
        $parodies: [String]
        $characters: [String]
        $files: [Upload]
    ) {
        insertManga(
            mangaInput: {
                name: $name
                alias: $alias
                language: $language
                artist: $artist
                group: $group
                tags: $tags
                category: $category
                parodies: $parodies
                characters: $characters
                files: $files
            }
        ) {
            name
        }
    }
`;

export const UPDATE_MANGA = gql`
    mutation updateManga(
        $id: ID
        $name: String!
        $alias: String
        $language: String!
        $artist: String!
        $group: String
        $tags: [String]
        $category: String
        $parodies: [String]
        $characters: [String]
        $files: [Upload]
    ) {
        updateManga(
            mangaInput: {
                id: $id
                name: $name
                alias: $alias
                language: $language
                artist: $artist
                group: $group
                tags: $tags
                category: $category
                parodies: $parodies
                characters: $characters
                files: $files
            }
        ) {
            id
            name
            alias
            language
            artist
            group
            tags
            category
            parodies
            characters
            pages {
                pageNumber
                pageSrc
            }
            coverImgSrc
        }
    }
`;

export const DELETE_MANGA = gql`
    mutation deleteManga($mangaId: ID!) {
        deleteManga(mangaId: $mangaId)
    }
`;

export const SEARCH_MANGA = gql`
    query searchManga(
        $page: Int!
        $limit: Int!
        $keyword: String
        $tags: [String]
        $category: String
        $language: String
        $filter: String
    ) {
        searchManga(
            searchInput: {
                page: $page
                limit: $limit
                keyword: $keyword
                tags: $tags
                category: $category
                language: $language
                filter: $filter
            }
        ) {
            mangaCount
            mangas {
                code
                name
                coverImgSrc
            }
        }
    }
`;

export const FAVORITE_MANGA = gql`
    mutation favoriteManga($userId: ID!, $mangaId: ID!) {
        favoriteManga(userId: $userId, mangaId: $mangaId)
    }
`;

export const LIST_FAVORITE_MANGAS = gql`
    query paginateFavorite(
        $userId: ID!
        $page: Int!
        $limit: Int!
        $keyword: String
    ) {
        paginateFavorite(
            userId: $userId
            page: $page
            limit: $limit
            keyword: $keyword
        ) {
            mangaCount
            mangas {
                id
                code
                name
                coverImgSrc
            }
        }
    }
`;

export const LIST_RECOMMENDATION = gql`
    query listSimilarMangas(
        $mangaId: ID!
        $artist: String
        $tags: [String]
        $category: String
    ) {
        listSimilarMangas(
            mangaId: $mangaId
            artist: $artist
            tags: $tags
            category: $category
        ) {
            id
            code
            name
            coverImgSrc
        }
    }
`;

export const GET_RANDOM_MANGA_ID = gql`
    query {
        getRandomMangaId
    }
`;
