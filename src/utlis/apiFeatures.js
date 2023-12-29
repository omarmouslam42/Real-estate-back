
export class ApiFeatures {
    constructor(mongooseQuery, queryData) {
        this.mongooseQuery = mongooseQuery;
        this.queryData = queryData;
    }

    pagination = () => {
        let page = Number(this.queryData.page)
        let limit = Number(this.queryData.limit)
        if (page <= 0 || !page) page = 1
        if (limit <= 0 || !limit) limit = 6
        const skip = limit * (page - 1)
        this.mongooseQuery.skip(skip).limit(limit)
        return this
    }

    sort = () => {
        const sort = this.queryData.sort || "createdAt"
        const order = this.queryData.order || "desc"
        // console.log(sort, order);
        this.mongooseQuery.sort({ [sort]: order })
        return this
    }

    search = () => {
        if (this.queryData.searchKey || this.queryData.offer || this.queryData.furnished || this.queryData.parking || this.queryData.type) {
            let searchKey = this.queryData.searchKey || ""
            let offer = this.queryData.offer
            let furnished = this.queryData.furnished
            let parking = this.queryData.parking
            let type = this.queryData.type

            if (offer == undefined || offer === "false") offer = { $in: [true, false] }
            if (furnished == undefined || furnished === "false") furnished = { $in: [true, false] }
            if (parking == undefined || parking === "false") parking = { $in: [true, false] }
            if (type == undefined || type === "all") type = { $in: ["sale", "rent"] }
            // console.log(this.queryData.searchKey);
            this.mongooseQuery.find({
                name: { $regex: searchKey },
                offer,
                furnished,
                parking,
                type
            })
        }
        return this

    }

    // select = () => {

    //     if (this.queryData.fields) {
    //         this.mongooseQuery.select(this.queryData.fields.replace(/,/g, ' '))
    //     }
    //     return this
    // }
}