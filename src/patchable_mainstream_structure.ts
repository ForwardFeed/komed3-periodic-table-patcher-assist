import type { Elements, MainstreamElementData } from "./mainstream_structure";

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type MainstreamStructurePatch = {
    [key in Elements]: DeepPartial<MainstreamElementData>
}


function get_patcheable_object(){
    return { la: {}, h: {}, he: {}, li: {}, be: {}, b: {}, c: {}, n: {}, o: {}, f: {},
    ne: {}, na: {}, mg: {}, al: {}, si: {}, p: {}, s: {}, cl: {}, ar: {}, k: {}, ca: {},
    sc: {}, ti: {}, v: {}, cr: {}, mn: {}, fe: {}, co: {}, ni: {}, cu: {}, zn: {}, ga: {},
    ge: {}, as: {}, se: {}, br: {}, kr: {}, rb: {}, sr: {}, y: {}, zr: {}, nb: {}, mo: {},
    tc: {}, ru: {}, rh: {}, pd: {}, ag: {}, cd: {}, in: {}, sn: {}, sb: {}, te: {}, i: {},
    xe: {}, cs: {}, ba: {}, ce: {}, pr: {}, nd: {}, pm: {}, sm: {}, eu: {}, gd: {}, tb: {},
    dy: {}, ho: {}, er: {}, tm: {}, yb: {}, lu: {}, hf: {}, ta: {}, w: {}, re: {}, os: {},
    ir: {}, pt: {}, au: {}, hg: {}, tl: {}, pb: {}, bi: {}, po: {}, at: {}, rn: {}, fr: {},
    ra: {}, ac: {}, th: {}, pa: {}, u: {}, np: {}, pu: {}, am: {}, cm: {}, bk: {}, cf: {},
    es: {}, fm: {}, md: {}, no: {}, lr: {}, rf: {}, db: {}, sg: {}, bh: {}, hs: {}, mt: {},
    ds: {}, rg: {}, cn: {}, nh: {}, fl: {}, mc: {}, lv: {}, ts: {}, og: {}
    } satisfies MainstreamStructurePatch
}
