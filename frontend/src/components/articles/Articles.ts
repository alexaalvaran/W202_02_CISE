export type Article = {
    _id?: string;
    title?:string;
    authors?: string;
    sources?:string;
    pubyear?:string;
    email?:string;
    doi?: string;
    claim?: string;
    evidence?:string;
    practice?:string;
};

export const DefaultArticle: Article = {
    _id: undefined,
    title: '',
    authors: '',
    sources: '',
    pubyear: '',
    email:'',
    doi:'',
    claim:'',
    evidence:'',
    practice:''
}
