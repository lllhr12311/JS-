var aaa;
!function(n) {
    var r = {};
    function i(t) {
        if (r[t])
            return r[t].exports;
        var e = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return n[t].call(e.exports, e, e.exports, i),
        e.l = !0,
        e.exports
    }
	aaa=i;
    i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    ,
    i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return i.d(e, "a", e),
        e
    }
    ,
    i.d = function(t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }
}({
	5:function(t, e, n) {
    !function(t) {
        "use strict";
        var e = "0123456789abcdefghijklmnopqrstuvwxyz";
        function c(t) {
            return e.charAt(t)
        }
        function n(t, e) {
            return t & e
        }
        function u(t, e) {
            return t | e
        }
        function r(t, e) {
            return t ^ e
        }
        function i(t, e) {
            return t & ~e
        }
        function o(t) {
            if (0 == t)
                return -1;
            var e = 0;
            return 0 == (65535 & t) && (t >>= 16,
            e += 16),
            0 == (255 & t) && (t >>= 8,
            e += 8),
            0 == (15 & t) && (t >>= 4,
            e += 4),
            0 == (3 & t) && (t >>= 2,
            e += 2),
            0 == (1 & t) && ++e,
            e
        }
        function s(t) {
            for (var e = 0; 0 != t; )
                t &= t - 1,
                ++e;
            return e
        }
        var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        function l(t) {
            var e, n, r = "";
            for (e = 0; e + 3 <= t.length; e += 3)
                n = parseInt(t.substring(e, e + 3), 16),
                r += a.charAt(n >> 6) + a.charAt(63 & n);
            for (e + 1 == t.length ? (n = parseInt(t.substring(e, e + 1), 16),
            r += a.charAt(n << 2)) : e + 2 == t.length && (n = parseInt(t.substring(e, e + 2), 16),
            r += a.charAt(n >> 2) + a.charAt((3 & n) << 4)); 0 < (3 & r.length); )
                r += "=";
            return r
        }
        function h(t) {
            var e, n = "", r = 0, i = 0;
            for (e = 0; e < t.length && "=" != t.charAt(e); ++e) {
                var o = a.indexOf(t.charAt(e));
                o < 0 || (r = 0 == r ? (n += c(o >> 2),
                i = 3 & o,
                1) : 1 == r ? (n += c(i << 2 | o >> 4),
                i = 15 & o,
                2) : 2 == r ? (n += c(i),
                n += c(o >> 2),
                i = 3 & o,
                3) : (n += c(i << 2 | o >> 4),
                n += c(15 & o),
                0))
            }
            return 1 == r && (n += c(i << 2)),
            n
        }
        var f, d = function(t, e) {
            return (d = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(t, e) {
                t.__proto__ = e
            }
            || function(t, e) {
                for (var n in e)
                    e.hasOwnProperty(n) && (t[n] = e[n])
            }
            )(t, e)
        };
        var p, g = {
            decode: function(t) {
                var e;
                if (void 0 === f) {
                    var n = "0123456789ABCDEF"
                      , r = " \f\n\r\t \u2028\u2029";
                    for (f = {},
                    e = 0; e < 16; ++e)
                        f[n.charAt(e)] = e;
                    for (n = n.toLowerCase(),
                    e = 10; e < 16; ++e)
                        f[n.charAt(e)] = e;
                    for (e = 0; e < r.length; ++e)
                        f[r.charAt(e)] = -1
                }
                var i = []
                  , o = 0
                  , s = 0;
                for (e = 0; e < t.length; ++e) {
                    var a = t.charAt(e);
                    if ("=" == a)
                        break;
                    if (-1 != (a = f[a])) {
                        if (void 0 === a)
                            throw new Error("Illegal character at offset " + e);
                        o |= a,
                        2 <= ++s ? (i[i.length] = o,
                        s = o = 0) : o <<= 4
                    }
                }
                if (s)
                    throw new Error("Hex encoding incomplete: 4 bits missing");
                return i
            }
        }, m = {
            decode: function(t) {
                var e;
                if (void 0 === p) {
                    var n = "= \f\n\r\t \u2028\u2029";
                    for (p = Object.create(null),
                    e = 0; e < 64; ++e)
                        p["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
                    for (e = 0; e < n.length; ++e)
                        p[n.charAt(e)] = -1
                }
                var r = []
                  , i = 0
                  , o = 0;
                for (e = 0; e < t.length; ++e) {
                    var s = t.charAt(e);
                    if ("=" == s)
                        break;
                    if (-1 != (s = p[s])) {
                        if (void 0 === s)
                            throw new Error("Illegal character at offset " + e);
                        i |= s,
                        4 <= ++o ? (r[r.length] = i >> 16,
                        r[r.length] = i >> 8 & 255,
                        r[r.length] = 255 & i,
                        o = i = 0) : i <<= 6
                    }
                }
                switch (o) {
                case 1:
                    throw new Error("Base64 encoding incomplete: at least 2 bits missing");
                case 2:
                    r[r.length] = i >> 10;
                    break;
                case 3:
                    r[r.length] = i >> 16,
                    r[r.length] = i >> 8 & 255
                }
                return r
            },
            re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
            unarmor: function(t) {
                var e = m.re.exec(t);
                if (e)
                    if (e[1])
                        t = e[1];
                    else {
                        if (!e[2])
                            throw new Error("RegExp out of sync");
                        t = e[2]
                    }
                return m.decode(t)
            }
        }, v = 1e13, y = function() {
            function t(t) {
                this.buf = [+t || 0]
            }
            return t.prototype.mulAdd = function(t, e) {
                var n, r, i = this.buf, o = i.length;
                for (n = 0; n < o; ++n)
                    (r = i[n] * t + e) < v ? e = 0 : r -= (e = 0 | r / v) * v,
                    i[n] = r;
                0 < e && (i[n] = e)
            }
            ,
            t.prototype.sub = function(t) {
                var e, n, r = this.buf, i = r.length;
                for (e = 0; e < i; ++e)
                    n = r[e] - t,
                    t = n < 0 ? (n += v,
                    1) : 0,
                    r[e] = n;
                for (; 0 === r[r.length - 1]; )
                    r.pop()
            }
            ,
            t.prototype.toString = function(t) {
                if (10 != (t || 10))
                    throw new Error("only base 10 is supported");
                for (var e = this.buf, n = e[e.length - 1].toString(), r = e.length - 2; 0 <= r; --r)
                    n += (v + e[r]).toString().substring(1);
                return n
            }
            ,
            t.prototype.valueOf = function() {
                for (var t = this.buf, e = 0, n = t.length - 1; 0 <= n; --n)
                    e = e * v + t[n];
                return e
            }
            ,
            t.prototype.simplify = function() {
                var t = this.buf;
                return 1 == t.length ? t[0] : this
            }
            ,
            t
        }(), b = "…", w = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, x = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
        function T(t, e) {
            return t.length > e && (t = t.substring(0, e) + b),
            t
        }
        var S, E = function() {
            function n(t, e) {
                this.hexDigits = "0123456789ABCDEF",
                t instanceof n ? (this.enc = t.enc,
                this.pos = t.pos) : (this.enc = t,
                this.pos = e)
            }
            return n.prototype.get = function(t) {
                if (void 0 === t && (t = this.pos++),
                t >= this.enc.length)
                    throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
                return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
            }
            ,
            n.prototype.hexByte = function(t) {
                return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
            }
            ,
            n.prototype.hexDump = function(t, e, n) {
                for (var r = "", i = t; i < e; ++i)
                    if (r += this.hexByte(this.get(i)),
                    !0 !== n)
                        switch (15 & i) {
                        case 7:
                            r += "  ";
                            break;
                        case 15:
                            r += "\n";
                            break;
                        default:
                            r += " "
                        }
                return r
            }
            ,
            n.prototype.isASCII = function(t, e) {
                for (var n = t; n < e; ++n) {
                    var r = this.get(n);
                    if (r < 32 || 176 < r)
                        return !1
                }
                return !0
            }
            ,
            n.prototype.parseStringISO = function(t, e) {
                for (var n = "", r = t; r < e; ++r)
                    n += String.fromCharCode(this.get(r));
                return n
            }
            ,
            n.prototype.parseStringUTF = function(t, e) {
                for (var n = "", r = t; r < e; ) {
                    var i = this.get(r++);
                    n += i < 128 ? String.fromCharCode(i) : 191 < i && i < 224 ? String.fromCharCode((31 & i) << 6 | 63 & this.get(r++)) : String.fromCharCode((15 & i) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++))
                }
                return n
            }
            ,
            n.prototype.parseStringBMP = function(t, e) {
                for (var n, r, i = "", o = t; o < e; )
                    n = this.get(o++),
                    r = this.get(o++),
                    i += String.fromCharCode(n << 8 | r);
                return i
            }
            ,
            n.prototype.parseTime = function(t, e, n) {
                var r = this.parseStringISO(t, e)
                  , i = (n ? w : x).exec(r);
                return i ? (n && (i[1] = +i[1],
                i[1] += +i[1] < 70 ? 2e3 : 1900),
                r = i[1] + "-" + i[2] + "-" + i[3] + " " + i[4],
                i[5] && (r += ":" + i[5],
                i[6] && (r += ":" + i[6],
                i[7] && (r += "." + i[7]))),
                i[8] && (r += " UTC",
                "Z" != i[8] && (r += i[8],
                i[9] && (r += ":" + i[9]))),
                r) : "Unrecognized time: " + r
            }
            ,
            n.prototype.parseInteger = function(t, e) {
                for (var n, r = this.get(t), i = 127 < r, o = i ? 255 : 0, s = ""; r == o && ++t < e; )
                    r = this.get(t);
                if (0 === (n = e - t))
                    return i ? -1 : 0;
                if (4 < n) {
                    for (s = r,
                    n <<= 3; 0 == (128 & (+s ^ o)); )
                        s = +s << 1,
                        --n;
                    s = "(" + n + " bit)\n"
                }
                i && (r -= 256);
                for (var a = new y(r), c = t + 1; c < e; ++c)
                    a.mulAdd(256, this.get(c));
                return s + a.toString()
            }
            ,
            n.prototype.parseBitString = function(t, e, n) {
                for (var r = this.get(t), i = (e - t - 1 << 3) - r, o = "(" + i + " bit)\n", s = "", a = t + 1; a < e; ++a) {
                    for (var c = this.get(a), u = a == e - 1 ? r : 0, l = 7; u <= l; --l)
                        s += c >> l & 1 ? "1" : "0";
                    if (s.length > n)
                        return o + T(s, n)
                }
                return o + s
            }
            ,
            n.prototype.parseOctetString = function(t, e, n) {
                if (this.isASCII(t, e))
                    return T(this.parseStringISO(t, e), n);
                var r = e - t
                  , i = "(" + r + " byte)\n";
                (n /= 2) < r && (e = t + n);
                for (var o = t; o < e; ++o)
                    i += this.hexByte(this.get(o));
                return n < r && (i += b),
                i
            }
            ,
            n.prototype.parseOID = function(t, e, n) {
                for (var r = "", i = new y, o = 0, s = t; s < e; ++s) {
                    var a = this.get(s);
                    if (i.mulAdd(128, 127 & a),
                    o += 7,
                    !(128 & a)) {
                        if ("" === r)
                            if ((i = i.simplify())instanceof y)
                                i.sub(80),
                                r = "2." + i.toString();
                            else {
                                var c = i < 80 ? i < 40 ? 0 : 1 : 2;
                                r = c + "." + (i - 40 * c)
                            }
                        else
                            r += "." + i.toString();
                        if (r.length > n)
                            return T(r, n);
                        i = new y,
                        o = 0
                    }
                }
                return 0 < o && (r += ".incomplete"),
                r
            }
            ,
            n
        }(), A = function() {
            function l(t, e, n, r, i) {
                if (!(r instanceof _))
                    throw new Error("Invalid tag value.");
                this.stream = t,
                this.header = e,
                this.length = n,
                this.tag = r,
                this.sub = i
            }
            return l.prototype.typeName = function() {
                switch (this.tag.tagClass) {
                case 0:
                    switch (this.tag.tagNumber) {
                    case 0:
                        return "EOC";
                    case 1:
                        return "BOOLEAN";
                    case 2:
                        return "INTEGER";
                    case 3:
                        return "BIT_STRING";
                    case 4:
                        return "OCTET_STRING";
                    case 5:
                        return "NULL";
                    case 6:
                        return "OBJECT_IDENTIFIER";
                    case 7:
                        return "ObjectDescriptor";
                    case 8:
                        return "EXTERNAL";
                    case 9:
                        return "REAL";
                    case 10:
                        return "ENUMERATED";
                    case 11:
                        return "EMBEDDED_PDV";
                    case 12:
                        return "UTF8String";
                    case 16:
                        return "SEQUENCE";
                    case 17:
                        return "SET";
                    case 18:
                        return "NumericString";
                    case 19:
                        return "PrintableString";
                    case 20:
                        return "TeletexString";
                    case 21:
                        return "VideotexString";
                    case 22:
                        return "IA5String";
                    case 23:
                        return "UTCTime";
                    case 24:
                        return "GeneralizedTime";
                    case 25:
                        return "GraphicString";
                    case 26:
                        return "VisibleString";
                    case 27:
                        return "GeneralString";
                    case 28:
                        return "UniversalString";
                    case 30:
                        return "BMPString"
                    }
                    return "Universal_" + this.tag.tagNumber.toString();
                case 1:
                    return "Application_" + this.tag.tagNumber.toString();
                case 2:
                    return "[" + this.tag.tagNumber.toString() + "]";
                case 3:
                    return "Private_" + this.tag.tagNumber.toString()
                }
            }
            ,
            l.prototype.content = function(t) {
                if (void 0 === this.tag)
                    return null;
                void 0 === t && (t = 1 / 0);
                var e = this.posContent()
                  , n = Math.abs(this.length);
                if (!this.tag.isUniversal())
                    return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + n, t);
                switch (this.tag.tagNumber) {
                case 1:
                    return 0 === this.stream.get(e) ? "false" : "true";
                case 2:
                    return this.stream.parseInteger(e, e + n);
                case 3:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + n, t);
                case 4:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + n, t);
                case 6:
                    return this.stream.parseOID(e, e + n, t);
                case 16:
                case 17:
                    return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
                case 12:
                    return T(this.stream.parseStringUTF(e, e + n), t);
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 26:
                    return T(this.stream.parseStringISO(e, e + n), t);
                case 30:
                    return T(this.stream.parseStringBMP(e, e + n), t);
                case 23:
                case 24:
                    return this.stream.parseTime(e, e + n, 23 == this.tag.tagNumber)
                }
                return null
            }
            ,
            l.prototype.toString = function() {
                return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
            }
            ,
            l.prototype.toPrettyString = function(t) {
                void 0 === t && (t = "");
                var e = t + this.typeName() + " @" + this.stream.pos;
                if (0 <= this.length && (e += "+"),
                e += this.length,
                this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"),
                e += "\n",
                null !== this.sub) {
                    t += "  ";
                    for (var n = 0, r = this.sub.length; n < r; ++n)
                        e += this.sub[n].toPrettyString(t)
                }
                return e
            }
            ,
            l.prototype.posStart = function() {
                return this.stream.pos
            }
            ,
            l.prototype.posContent = function() {
                return this.stream.pos + this.header
            }
            ,
            l.prototype.posEnd = function() {
                return this.stream.pos + this.header + Math.abs(this.length)
            }
            ,
            l.prototype.toHexString = function() {
                return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
            }
            ,
            l.decodeLength = function(t) {
                var e = t.get()
                  , n = 127 & e;
                if (n == e)
                    return n;
                if (6 < n)
                    throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
                if (0 == n)
                    return null;
                for (var r = e = 0; r < n; ++r)
                    e = 256 * e + t.get();
                return e
            }
            ,
            l.prototype.getHexStringValue = function() {
                var t = this.toHexString()
                  , e = 2 * this.header
                  , n = 2 * this.length;
                return t.substr(e, n)
            }
            ,
            l.decode = function(t) {
                var r;
                r = t instanceof E ? t : new E(t,0);
                var e = new E(r)
                  , n = new _(r)
                  , i = l.decodeLength(r)
                  , o = r.pos
                  , s = o - e.pos
                  , a = null
                  , c = function() {
                    var t = [];
                    if (null !== i) {
                        for (var e = o + i; r.pos < e; )
                            t[t.length] = l.decode(r);
                        if (r.pos != e)
                            throw new Error("Content size is not correct for container starting at offset " + o)
                    } else
                        try {
                            for (; ; ) {
                                var n = l.decode(r);
                                if (n.tag.isEOC())
                                    break;
                                t[t.length] = n
                            }
                            i = o - r.pos
                        } catch (t) {
                            throw new Error("Exception while decoding undefined length content: " + t)
                        }
                    return t
                };
                if (n.tagConstructed)
                    a = c();
                else if (n.isUniversal() && (3 == n.tagNumber || 4 == n.tagNumber))
                    try {
                        if (3 == n.tagNumber && 0 != r.get())
                            throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                        a = c();
                        for (var u = 0; u < a.length; ++u)
                            if (a[u].tag.isEOC())
                                throw new Error("EOC is not supposed to be actual content.")
                    } catch (t) {
                        a = null
                    }
                if (null === a) {
                    if (null === i)
                        throw new Error("We can't skip over an invalid tag with undefined length at offset " + o);
                    r.pos = o + Math.abs(i)
                }
                return new l(e,s,i,n,a)
            }
            ,
            l
        }(), _ = function() {
            function t(t) {
                var e = t.get();
                if (this.tagClass = e >> 6,
                this.tagConstructed = 0 != (32 & e),
                this.tagNumber = 31 & e,
                31 == this.tagNumber) {
                    for (var n = new y; e = t.get(),
                    n.mulAdd(128, 127 & e),
                    128 & e; )
                        ;
                    this.tagNumber = n.simplify()
                }
            }
            return t.prototype.isUniversal = function() {
                return 0 === this.tagClass
            }
            ,
            t.prototype.isEOC = function() {
                return 0 === this.tagClass && 0 === this.tagNumber
            }
            ,
            t
        }(), D = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], C = (1 << 26) / D[D.length - 1], k = function() {
            function b(t, e, n) {
                null != t && ("number" == typeof t ? this.fromNumber(t, e, n) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
            }
            return b.prototype.toString = function(t) {
                if (this.s < 0)
                    return "-" + this.negate().toString(t);
                var e;
                if (16 == t)
                    e = 4;
                else if (8 == t)
                    e = 3;
                else if (2 == t)
                    e = 1;
                else if (32 == t)
                    e = 5;
                else {
                    if (4 != t)
                        return this.toRadix(t);
                    e = 2
                }
                var n, r = (1 << e) - 1, i = !1, o = "", s = this.t, a = this.DB - s * this.DB % e;
                if (0 < s--)
                    for (a < this.DB && 0 < (n = this[s] >> a) && (i = !0,
                    o = c(n)); 0 <= s; )
                        a < e ? (n = (this[s] & (1 << a) - 1) << e - a,
                        n |= this[--s] >> (a += this.DB - e)) : (n = this[s] >> (a -= e) & r,
                        a <= 0 && (a += this.DB,
                        --s)),
                        0 < n && (i = !0),
                        i && (o += c(n));
                return i ? o : "0"
            }
            ,
            b.prototype.negate = function() {
                var t = I();
                return b.ZERO.subTo(this, t),
                t
            }
            ,
            b.prototype.abs = function() {
                return this.s < 0 ? this.negate() : this
            }
            ,
            b.prototype.compareTo = function(t) {
                var e = this.s - t.s;
                if (0 != e)
                    return e;
                var n = this.t;
                if (0 != (e = n - t.t))
                    return this.s < 0 ? -e : e;
                for (; 0 <= --n; )
                    if (0 != (e = this[n] - t[n]))
                        return e;
                return 0
            }
            ,
            b.prototype.bitLength = function() {
                return this.t <= 0 ? 0 : this.DB * (this.t - 1) + q(this[this.t - 1] ^ this.s & this.DM)
            }
            ,
            b.prototype.mod = function(t) {
                var e = I();
                return this.abs().divRemTo(t, null, e),
                this.s < 0 && 0 < e.compareTo(b.ZERO) && t.subTo(e, e),
                e
            }
            ,
            b.prototype.modPowInt = function(t, e) {
                var n;
                return n = t < 256 || e.isEven() ? new R(e) : new O(e),
                this.exp(t, n)
            }
            ,
            b.prototype.clone = function() {
                var t = I();
                return this.copyTo(t),
                t
            }
            ,
            b.prototype.intValue = function() {
                if (this.s < 0) {
                    if (1 == this.t)
                        return this[0] - this.DV;
                    if (0 == this.t)
                        return -1
                } else {
                    if (1 == this.t)
                        return this[0];
                    if (0 == this.t)
                        return 0
                }
                return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
            }
            ,
            b.prototype.byteValue = function() {
                return 0 == this.t ? this.s : this[0] << 24 >> 24
            }
            ,
            b.prototype.shortValue = function() {
                return 0 == this.t ? this.s : this[0] << 16 >> 16
            }
            ,
            b.prototype.signum = function() {
                return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
            }
            ,
            b.prototype.toByteArray = function() {
                var t = this.t
                  , e = [];
                e[0] = this.s;
                var n, r = this.DB - t * this.DB % 8, i = 0;
                if (0 < t--)
                    for (r < this.DB && (n = this[t] >> r) != (this.s & this.DM) >> r && (e[i++] = n | this.s << this.DB - r); 0 <= t; )
                        r < 8 ? (n = (this[t] & (1 << r) - 1) << 8 - r,
                        n |= this[--t] >> (r += this.DB - 8)) : (n = this[t] >> (r -= 8) & 255,
                        r <= 0 && (r += this.DB,
                        --t)),
                        0 != (128 & n) && (n |= -256),
                        0 == i && (128 & this.s) != (128 & n) && ++i,
                        (0 < i || n != this.s) && (e[i++] = n);
                return e
            }
            ,
            b.prototype.equals = function(t) {
                return 0 == this.compareTo(t)
            }
            ,
            b.prototype.min = function(t) {
                return this.compareTo(t) < 0 ? this : t
            }
            ,
            b.prototype.max = function(t) {
                return 0 < this.compareTo(t) ? this : t
            }
            ,
            b.prototype.and = function(t) {
                var e = I();
                return this.bitwiseTo(t, n, e),
                e
            }
            ,
            b.prototype.or = function(t) {
                var e = I();
                return this.bitwiseTo(t, u, e),
                e
            }
            ,
            b.prototype.xor = function(t) {
                var e = I();
                return this.bitwiseTo(t, r, e),
                e
            }
            ,
            b.prototype.andNot = function(t) {
                var e = I();
                return this.bitwiseTo(t, i, e),
                e
            }
            ,
            b.prototype.not = function() {
                for (var t = I(), e = 0; e < this.t; ++e)
                    t[e] = this.DM & ~this[e];
                return t.t = this.t,
                t.s = ~this.s,
                t
            }
            ,
            b.prototype.shiftLeft = function(t) {
                var e = I();
                return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
                e
            }
            ,
            b.prototype.shiftRight = function(t) {
                var e = I();
                return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
                e
            }
            ,
            b.prototype.getLowestSetBit = function() {
                for (var t = 0; t < this.t; ++t)
                    if (0 != this[t])
                        return t * this.DB + o(this[t]);
                return this.s < 0 ? this.t * this.DB : -1
            }
            ,
            b.prototype.bitCount = function() {
                for (var t = 0, e = this.s & this.DM, n = 0; n < this.t; ++n)
                    t += s(this[n] ^ e);
                return t
            }
            ,
            b.prototype.testBit = function(t) {
                var e = Math.floor(t / this.DB);
                return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
            }
            ,
            b.prototype.setBit = function(t) {
                return this.changeBit(t, u)
            }
            ,
            b.prototype.clearBit = function(t) {
                return this.changeBit(t, i)
            }
            ,
            b.prototype.flipBit = function(t) {
                return this.changeBit(t, r)
            }
            ,
            b.prototype.add = function(t) {
                var e = I();
                return this.addTo(t, e),
                e
            }
            ,
            b.prototype.subtract = function(t) {
                var e = I();
                return this.subTo(t, e),
                e
            }
            ,
            b.prototype.multiply = function(t) {
                var e = I();
                return this.multiplyTo(t, e),
                e
            }
            ,
            b.prototype.divide = function(t) {
                var e = I();
                return this.divRemTo(t, e, null),
                e
            }
            ,
            b.prototype.remainder = function(t) {
                var e = I();
                return this.divRemTo(t, null, e),
                e
            }
            ,
            b.prototype.divideAndRemainder = function(t) {
                var e = I()
                  , n = I();
                return this.divRemTo(t, e, n),
                [e, n]
            }
            ,
            b.prototype.modPow = function(t, e) {
                var n, r, i = t.bitLength(), o = H(1);
                if (i <= 0)
                    return o;
                n = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6,
                r = i < 8 ? new R(e) : e.isEven() ? new j(e) : new O(e);
                var s = []
                  , a = 3
                  , c = n - 1
                  , u = (1 << n) - 1;
                if (s[1] = r.convert(this),
                1 < n) {
                    var l = I();
                    for (r.sqrTo(s[1], l); a <= u; )
                        s[a] = I(),
                        r.mulTo(l, s[a - 2], s[a]),
                        a += 2
                }
                var h, f, d = t.t - 1, p = !0, g = I();
                for (i = q(t[d]) - 1; 0 <= d; ) {
                    for (c <= i ? h = t[d] >> i - c & u : (h = (t[d] & (1 << i + 1) - 1) << c - i,
                    0 < d && (h |= t[d - 1] >> this.DB + i - c)),
                    a = n; 0 == (1 & h); )
                        h >>= 1,
                        --a;
                    if ((i -= a) < 0 && (i += this.DB,
                    --d),
                    p)
                        s[h].copyTo(o),
                        p = !1;
                    else {
                        for (; 1 < a; )
                            r.sqrTo(o, g),
                            r.sqrTo(g, o),
                            a -= 2;
                        0 < a ? r.sqrTo(o, g) : (f = o,
                        o = g,
                        g = f),
                        r.mulTo(g, s[h], o)
                    }
                    for (; 0 <= d && 0 == (t[d] & 1 << i); )
                        r.sqrTo(o, g),
                        f = o,
                        o = g,
                        g = f,
                        --i < 0 && (i = this.DB - 1,
                        --d)
                }
                return r.revert(o)
            }
            ,
            b.prototype.modInverse = function(t) {
                var e = t.isEven();
                if (this.isEven() && e || 0 == t.signum())
                    return b.ZERO;
                for (var n = t.clone(), r = this.clone(), i = H(1), o = H(0), s = H(0), a = H(1); 0 != n.signum(); ) {
                    for (; n.isEven(); )
                        n.rShiftTo(1, n),
                        e ? (i.isEven() && o.isEven() || (i.addTo(this, i),
                        o.subTo(t, o)),
                        i.rShiftTo(1, i)) : o.isEven() || o.subTo(t, o),
                        o.rShiftTo(1, o);
                    for (; r.isEven(); )
                        r.rShiftTo(1, r),
                        e ? (s.isEven() && a.isEven() || (s.addTo(this, s),
                        a.subTo(t, a)),
                        s.rShiftTo(1, s)) : a.isEven() || a.subTo(t, a),
                        a.rShiftTo(1, a);
                    0 <= n.compareTo(r) ? (n.subTo(r, n),
                    e && i.subTo(s, i),
                    o.subTo(a, o)) : (r.subTo(n, r),
                    e && s.subTo(i, s),
                    a.subTo(o, a))
                }
                return 0 != r.compareTo(b.ONE) ? b.ZERO : 0 <= a.compareTo(t) ? a.subtract(t) : a.signum() < 0 ? (a.addTo(t, a),
                a.signum() < 0 ? a.add(t) : a) : a
            }
            ,
            b.prototype.pow = function(t) {
                return this.exp(t, new N)
            }
            ,
            b.prototype.gcd = function(t) {
                var e = this.s < 0 ? this.negate() : this.clone()
                  , n = t.s < 0 ? t.negate() : t.clone();
                if (e.compareTo(n) < 0) {
                    var r = e;
                    e = n,
                    n = r
                }
                var i = e.getLowestSetBit()
                  , o = n.getLowestSetBit();
                if (o < 0)
                    return e;
                for (i < o && (o = i),
                0 < o && (e.rShiftTo(o, e),
                n.rShiftTo(o, n)); 0 < e.signum(); )
                    0 < (i = e.getLowestSetBit()) && e.rShiftTo(i, e),
                    0 < (i = n.getLowestSetBit()) && n.rShiftTo(i, n),
                    0 <= e.compareTo(n) ? (e.subTo(n, e),
                    e.rShiftTo(1, e)) : (n.subTo(e, n),
                    n.rShiftTo(1, n));
                return 0 < o && n.lShiftTo(o, n),
                n
            }
            ,
            b.prototype.isProbablePrime = function(t) {
                var e, n = this.abs();
                if (1 == n.t && n[0] <= D[D.length - 1]) {
                    for (e = 0; e < D.length; ++e)
                        if (n[0] == D[e])
                            return !0;
                    return !1
                }
                if (n.isEven())
                    return !1;
                for (e = 1; e < D.length; ) {
                    for (var r = D[e], i = e + 1; i < D.length && r < C; )
                        r *= D[i++];
                    for (r = n.modInt(r); e < i; )
                        if (r % D[e++] == 0)
                            return !1
                }
                return n.millerRabin(t)
            }
            ,
            b.prototype.copyTo = function(t) {
                for (var e = this.t - 1; 0 <= e; --e)
                    t[e] = this[e];
                t.t = this.t,
                t.s = this.s
            }
            ,
            b.prototype.fromInt = function(t) {
                this.t = 1,
                this.s = t < 0 ? -1 : 0,
                0 < t ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
            }
            ,
            b.prototype.fromString = function(t, e) {
                var n;
                if (16 == e)
                    n = 4;
                else if (8 == e)
                    n = 3;
                else if (256 == e)
                    n = 8;
                else if (2 == e)
                    n = 1;
                else if (32 == e)
                    n = 5;
                else {
                    if (4 != e)
                        return void this.fromRadix(t, e);
                    n = 2
                }
                this.t = 0,
                this.s = 0;
                for (var r = t.length, i = !1, o = 0; 0 <= --r; ) {
                    var s = 8 == n ? 255 & +t[r] : V(t, r);
                    s < 0 ? "-" == t.charAt(r) && (i = !0) : (i = !1,
                    0 == o ? this[this.t++] = s : o + n > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - o) - 1) << o,
                    this[this.t++] = s >> this.DB - o) : this[this.t - 1] |= s << o,
                    (o += n) >= this.DB && (o -= this.DB))
                }
                8 == n && 0 != (128 & +t[0]) && (this.s = -1,
                0 < o && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)),
                this.clamp(),
                i && b.ZERO.subTo(this, this)
            }
            ,
            b.prototype.clamp = function() {
                for (var t = this.s & this.DM; 0 < this.t && this[this.t - 1] == t; )
                    --this.t
            }
            ,
            b.prototype.dlShiftTo = function(t, e) {
                var n;
                for (n = this.t - 1; 0 <= n; --n)
                    e[n + t] = this[n];
                for (n = t - 1; 0 <= n; --n)
                    e[n] = 0;
                e.t = this.t + t,
                e.s = this.s
            }
            ,
            b.prototype.drShiftTo = function(t, e) {
                for (var n = t; n < this.t; ++n)
                    e[n - t] = this[n];
                e.t = Math.max(this.t - t, 0),
                e.s = this.s
            }
            ,
            b.prototype.lShiftTo = function(t, e) {
                for (var n = t % this.DB, r = this.DB - n, i = (1 << r) - 1, o = Math.floor(t / this.DB), s = this.s << n & this.DM, a = this.t - 1; 0 <= a; --a)
                    e[a + o + 1] = this[a] >> r | s,
                    s = (this[a] & i) << n;
                for (var a = o - 1; 0 <= a; --a)
                    e[a] = 0;
                e[o] = s,
                e.t = this.t + o + 1,
                e.s = this.s,
                e.clamp()
            }
            ,
            b.prototype.rShiftTo = function(t, e) {
                e.s = this.s;
                var n = Math.floor(t / this.DB);
                if (n >= this.t)
                    e.t = 0;
                else {
                    var r = t % this.DB
                      , i = this.DB - r
                      , o = (1 << r) - 1;
                    e[0] = this[n] >> r;
                    for (var s = n + 1; s < this.t; ++s)
                        e[s - n - 1] |= (this[s] & o) << i,
                        e[s - n] = this[s] >> r;
                    0 < r && (e[this.t - n - 1] |= (this.s & o) << i),
                    e.t = this.t - n,
                    e.clamp()
                }
            }
            ,
            b.prototype.subTo = function(t, e) {
                for (var n = 0, r = 0, i = Math.min(t.t, this.t); n < i; )
                    r += this[n] - t[n],
                    e[n++] = r & this.DM,
                    r >>= this.DB;
                if (t.t < this.t) {
                    for (r -= t.s; n < this.t; )
                        r += this[n],
                        e[n++] = r & this.DM,
                        r >>= this.DB;
                    r += this.s
                } else {
                    for (r += this.s; n < t.t; )
                        r -= t[n],
                        e[n++] = r & this.DM,
                        r >>= this.DB;
                    r -= t.s
                }
                e.s = r < 0 ? -1 : 0,
                r < -1 ? e[n++] = this.DV + r : 0 < r && (e[n++] = r),
                e.t = n,
                e.clamp()
            }
            ,
            b.prototype.multiplyTo = function(t, e) {
                var n = this.abs()
                  , r = t.abs()
                  , i = n.t;
                for (e.t = i + r.t; 0 <= --i; )
                    e[i] = 0;
                for (i = 0; i < r.t; ++i)
                    e[i + n.t] = n.am(0, r[i], e, i, 0, n.t);
                e.s = 0,
                e.clamp(),
                this.s != t.s && b.ZERO.subTo(e, e)
            }
            ,
            b.prototype.squareTo = function(t) {
                for (var e = this.abs(), n = t.t = 2 * e.t; 0 <= --n; )
                    t[n] = 0;
                for (n = 0; n < e.t - 1; ++n) {
                    var r = e.am(n, e[n], t, 2 * n, 0, 1);
                    (t[n + e.t] += e.am(n + 1, 2 * e[n], t, 2 * n + 1, r, e.t - n - 1)) >= e.DV && (t[n + e.t] -= e.DV,
                    t[n + e.t + 1] = 1)
                }
                0 < t.t && (t[t.t - 1] += e.am(n, e[n], t, 2 * n, 0, 1)),
                t.s = 0,
                t.clamp()
            }
            ,
            b.prototype.divRemTo = function(t, e, n) {
                var r = t.abs();
                if (!(r.t <= 0)) {
                    var i = this.abs();
                    if (i.t < r.t)
                        return null != e && e.fromInt(0),
                        void (null != n && this.copyTo(n));
                    null == n && (n = I());
                    var o = I()
                      , s = this.s
                      , a = t.s
                      , c = this.DB - q(r[r.t - 1]);
                    0 < c ? (r.lShiftTo(c, o),
                    i.lShiftTo(c, n)) : (r.copyTo(o),
                    i.copyTo(n));
                    var u = o.t
                      , l = o[u - 1];
                    if (0 != l) {
                        var h = l * (1 << this.F1) + (1 < u ? o[u - 2] >> this.F2 : 0)
                          , f = this.FV / h
                          , d = (1 << this.F1) / h
                          , p = 1 << this.F2
                          , g = n.t
                          , m = g - u
                          , v = null == e ? I() : e;
                        for (o.dlShiftTo(m, v),
                        0 <= n.compareTo(v) && (n[n.t++] = 1,
                        n.subTo(v, n)),
                        b.ONE.dlShiftTo(u, v),
                        v.subTo(o, o); o.t < u; )
                            o[o.t++] = 0;
                        for (; 0 <= --m; ) {
                            var y = n[--g] == l ? this.DM : Math.floor(n[g] * f + (n[g - 1] + p) * d);
                            if ((n[g] += o.am(0, y, n, m, 0, u)) < y)
                                for (o.dlShiftTo(m, v),
                                n.subTo(v, n); n[g] < --y; )
                                    n.subTo(v, n)
                        }
                        null != e && (n.drShiftTo(u, e),
                        s != a && b.ZERO.subTo(e, e)),
                        n.t = u,
                        n.clamp(),
                        0 < c && n.rShiftTo(c, n),
                        s < 0 && b.ZERO.subTo(n, n)
                    }
                }
            }
            ,
            b.prototype.invDigit = function() {
                if (this.t < 1)
                    return 0;
                var t = this[0];
                if (0 == (1 & t))
                    return 0;
                var e = 3 & t;
                return 0 < (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) ? this.DV - e : -e
            }
            ,
            b.prototype.isEven = function() {
                return 0 == (0 < this.t ? 1 & this[0] : this.s)
            }
            ,
            b.prototype.exp = function(t, e) {
                if (4294967295 < t || t < 1)
                    return b.ONE;
                var n = I()
                  , r = I()
                  , i = e.convert(this)
                  , o = q(t) - 1;
                for (i.copyTo(n); 0 <= --o; )
                    if (e.sqrTo(n, r),
                    0 < (t & 1 << o))
                        e.mulTo(r, i, n);
                    else {
                        var s = n;
                        n = r,
                        r = s
                    }
                return e.revert(n)
            }
            ,
            b.prototype.chunkSize = function(t) {
                return Math.floor(Math.LN2 * this.DB / Math.log(t))
            }
            ,
            b.prototype.toRadix = function(t) {
                if (null == t && (t = 10),
                0 == this.signum() || t < 2 || 36 < t)
                    return "0";
                var e = this.chunkSize(t)
                  , n = Math.pow(t, e)
                  , r = H(n)
                  , i = I()
                  , o = I()
                  , s = "";
                for (this.divRemTo(r, i, o); 0 < i.signum(); )
                    s = (n + o.intValue()).toString(t).substr(1) + s,
                    i.divRemTo(r, i, o);
                return o.intValue().toString(t) + s
            }
            ,
            b.prototype.fromRadix = function(t, e) {
                this.fromInt(0),
                null == e && (e = 10);
                for (var n = this.chunkSize(e), r = Math.pow(e, n), i = !1, o = 0, s = 0, a = 0; a < t.length; ++a) {
                    var c = V(t, a);
                    c < 0 ? "-" == t.charAt(a) && 0 == this.signum() && (i = !0) : (s = e * s + c,
                    ++o >= n && (this.dMultiply(r),
                    this.dAddOffset(s, 0),
                    s = o = 0))
                }
                0 < o && (this.dMultiply(Math.pow(e, o)),
                this.dAddOffset(s, 0)),
                i && b.ZERO.subTo(this, this)
            }
            ,
            b.prototype.fromNumber = function(t, e, n) {
                if ("number" == typeof e)
                    if (t < 2)
                        this.fromInt(1);
                    else
                        for (this.fromNumber(t, n),
                        this.testBit(t - 1) || this.bitwiseTo(b.ONE.shiftLeft(t - 1), u, this),
                        this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e); )
                            this.dAddOffset(2, 0),
                            this.bitLength() > t && this.subTo(b.ONE.shiftLeft(t - 1), this);
                else {
                    var r = []
                      , i = 7 & t;
                    r.length = 1 + (t >> 3),
                    e.nextBytes(r),
                    0 < i ? r[0] &= (1 << i) - 1 : r[0] = 0,
                    this.fromString(r, 256)
                }
            }
            ,
            b.prototype.bitwiseTo = function(t, e, n) {
                var r, i, o = Math.min(t.t, this.t);
                for (r = 0; r < o; ++r)
                    n[r] = e(this[r], t[r]);
                if (t.t < this.t) {
                    for (i = t.s & this.DM,
                    r = o; r < this.t; ++r)
                        n[r] = e(this[r], i);
                    n.t = this.t
                } else {
                    for (i = this.s & this.DM,
                    r = o; r < t.t; ++r)
                        n[r] = e(i, t[r]);
                    n.t = t.t
                }
                n.s = e(this.s, t.s),
                n.clamp()
            }
            ,
            b.prototype.changeBit = function(t, e) {
                var n = b.ONE.shiftLeft(t);
                return this.bitwiseTo(n, e, n),
                n
            }
            ,
            b.prototype.addTo = function(t, e) {
                for (var n = 0, r = 0, i = Math.min(t.t, this.t); n < i; )
                    r += this[n] + t[n],
                    e[n++] = r & this.DM,
                    r >>= this.DB;
                if (t.t < this.t) {
                    for (r += t.s; n < this.t; )
                        r += this[n],
                        e[n++] = r & this.DM,
                        r >>= this.DB;
                    r += this.s
                } else {
                    for (r += this.s; n < t.t; )
                        r += t[n],
                        e[n++] = r & this.DM,
                        r >>= this.DB;
                    r += t.s
                }
                e.s = r < 0 ? -1 : 0,
                0 < r ? e[n++] = r : r < -1 && (e[n++] = this.DV + r),
                e.t = n,
                e.clamp()
            }
            ,
            b.prototype.dMultiply = function(t) {
                this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
                ++this.t,
                this.clamp()
            }
            ,
            b.prototype.dAddOffset = function(t, e) {
                if (0 != t) {
                    for (; this.t <= e; )
                        this[this.t++] = 0;
                    for (this[e] += t; this[e] >= this.DV; )
                        this[e] -= this.DV,
                        ++e >= this.t && (this[this.t++] = 0),
                        ++this[e]
                }
            }
            ,
            b.prototype.multiplyLowerTo = function(t, e, n) {
                var r = Math.min(this.t + t.t, e);
                for (n.s = 0,
                n.t = r; 0 < r; )
                    n[--r] = 0;
                for (var i = n.t - this.t; r < i; ++r)
                    n[r + this.t] = this.am(0, t[r], n, r, 0, this.t);
                for (var i = Math.min(t.t, e); r < i; ++r)
                    this.am(0, t[r], n, r, 0, e - r);
                n.clamp()
            }
            ,
            b.prototype.multiplyUpperTo = function(t, e, n) {
                --e;
                var r = n.t = this.t + t.t - e;
                for (n.s = 0; 0 <= --r; )
                    n[r] = 0;
                for (r = Math.max(e - this.t, 0); r < t.t; ++r)
                    n[this.t + r - e] = this.am(e - r, t[r], n, 0, 0, this.t + r - e);
                n.clamp(),
                n.drShiftTo(1, n)
            }
            ,
            b.prototype.modInt = function(t) {
                if (t <= 0)
                    return 0;
                var e = this.DV % t
                  , n = this.s < 0 ? t - 1 : 0;
                if (0 < this.t)
                    if (0 == e)
                        n = this[0] % t;
                    else
                        for (var r = this.t - 1; 0 <= r; --r)
                            n = (e * n + this[r]) % t;
                return n
            }
            ,
            b.prototype.millerRabin = function(t) {
                var e = this.subtract(b.ONE)
                  , n = e.getLowestSetBit();
                if (n <= 0)
                    return !1;
                var r = e.shiftRight(n);
                D.length < (t = t + 1 >> 1) && (t = D.length);
                for (var i = I(), o = 0; o < t; ++o) {
                    i.fromInt(D[Math.floor(Math.random() * D.length)]);
                    var s = i.modPow(r, this);
                    if (0 != s.compareTo(b.ONE) && 0 != s.compareTo(e)) {
                        for (var a = 1; a++ < n && 0 != s.compareTo(e); )
                            if (0 == (s = s.modPowInt(2, this)).compareTo(b.ONE))
                                return !1;
                        if (0 != s.compareTo(e))
                            return !1
                    }
                }
                return !0
            }
            ,
            b.prototype.square = function() {
                var t = I();
                return this.squareTo(t),
                t
            }
            ,
            b.prototype.gcda = function(t, e) {
                var n = this.s < 0 ? this.negate() : this.clone()
                  , r = t.s < 0 ? t.negate() : t.clone();
                if (n.compareTo(r) < 0) {
                    var i = n;
                    n = r,
                    r = i
                }
                var o = n.getLowestSetBit()
                  , s = r.getLowestSetBit();
                if (s < 0)
                    e(n);
                else {
                    o < s && (s = o),
                    0 < s && (n.rShiftTo(s, n),
                    r.rShiftTo(s, r));
                    var a = function() {
                        0 < (o = n.getLowestSetBit()) && n.rShiftTo(o, n),
                        0 < (o = r.getLowestSetBit()) && r.rShiftTo(o, r),
                        0 <= n.compareTo(r) ? (n.subTo(r, n),
                        n.rShiftTo(1, n)) : (r.subTo(n, r),
                        r.rShiftTo(1, r)),
                        0 < n.signum() ? setTimeout(a, 0) : (0 < s && r.lShiftTo(s, r),
                        setTimeout(function() {
                            e(r)
                        }, 0))
                    };
                    setTimeout(a, 10)
                }
            }
            ,
            b.prototype.fromNumberAsync = function(t, e, n, r) {
                if ("number" == typeof e)
                    if (t < 2)
                        this.fromInt(1);
                    else {
                        this.fromNumber(t, n),
                        this.testBit(t - 1) || this.bitwiseTo(b.ONE.shiftLeft(t - 1), u, this),
                        this.isEven() && this.dAddOffset(1, 0);
                        var i = this
                          , o = function() {
                            i.dAddOffset(2, 0),
                            i.bitLength() > t && i.subTo(b.ONE.shiftLeft(t - 1), i),
                            i.isProbablePrime(e) ? setTimeout(function() {
                                r()
                            }, 0) : setTimeout(o, 0)
                        };
                        setTimeout(o, 0)
                    }
                else {
                    var s = []
                      , a = 7 & t;
                    s.length = 1 + (t >> 3),
                    e.nextBytes(s),
                    0 < a ? s[0] &= (1 << a) - 1 : s[0] = 0,
                    this.fromString(s, 256)
                }
            }
            ,
            b
        }(), N = function() {
            function t() {}
            return t.prototype.convert = function(t) {
                return t
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.mulTo = function(t, e, n) {
                t.multiplyTo(e, n)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e)
            }
            ,
            t
        }(), R = function() {
            function t(t) {
                this.m = t
            }
            return t.prototype.convert = function(t) {
                return t.s < 0 || 0 <= t.compareTo(this.m) ? t.mod(this.m) : t
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.reduce = function(t) {
                t.divRemTo(this.m, null, t)
            }
            ,
            t.prototype.mulTo = function(t, e, n) {
                t.multiplyTo(e, n),
                this.reduce(n)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }(), O = function() {
            function t(t) {
                this.m = t,
                this.mp = t.invDigit(),
                this.mpl = 32767 & this.mp,
                this.mph = this.mp >> 15,
                this.um = (1 << t.DB - 15) - 1,
                this.mt2 = 2 * t.t
            }
            return t.prototype.convert = function(t) {
                var e = I();
                return t.abs().dlShiftTo(this.m.t, e),
                e.divRemTo(this.m, null, e),
                t.s < 0 && 0 < e.compareTo(k.ZERO) && this.m.subTo(e, e),
                e
            }
            ,
            t.prototype.revert = function(t) {
                var e = I();
                return t.copyTo(e),
                this.reduce(e),
                e
            }
            ,
            t.prototype.reduce = function(t) {
                for (; t.t <= this.mt2; )
                    t[t.t++] = 0;
                for (var e = 0; e < this.m.t; ++e) {
                    var n = 32767 & t[e]
                      , r = n * this.mpl + ((n * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                    for (n = e + this.m.t,
                    t[n] += this.m.am(0, r, t, e, 0, this.m.t); t[n] >= t.DV; )
                        t[n] -= t.DV,
                        t[++n]++
                }
                t.clamp(),
                t.drShiftTo(this.m.t, t),
                0 <= t.compareTo(this.m) && t.subTo(this.m, t)
            }
            ,
            t.prototype.mulTo = function(t, e, n) {
                t.multiplyTo(e, n),
                this.reduce(n)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }(), j = function() {
            function t(t) {
                this.m = t,
                this.r2 = I(),
                this.q3 = I(),
                k.ONE.dlShiftTo(2 * t.t, this.r2),
                this.mu = this.r2.divide(t)
            }
            return t.prototype.convert = function(t) {
                if (t.s < 0 || t.t > 2 * this.m.t)
                    return t.mod(this.m);
                if (t.compareTo(this.m) < 0)
                    return t;
                var e = I();
                return t.copyTo(e),
                this.reduce(e),
                e
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.reduce = function(t) {
                for (t.drShiftTo(this.m.t - 1, this.r2),
                t.t > this.m.t + 1 && (t.t = this.m.t + 1,
                t.clamp()),
                this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
                this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0; )
                    t.dAddOffset(1, this.m.t + 1);
                for (t.subTo(this.r2, t); 0 <= t.compareTo(this.m); )
                    t.subTo(this.m, t)
            }
            ,
            t.prototype.mulTo = function(t, e, n) {
                t.multiplyTo(e, n),
                this.reduce(n)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }();
        function I() {
            return new k(null)
        }
        function P(t, e) {
            return new k(t,e)
        }
        S = "Microsoft Internet Explorer" == navigator.appName ? (k.prototype.am = function(t, e, n, r, i, o) {
            var s = 32767 & e
              , a = e >> 15;
            for (; 0 <= --o; ) {
                var c = 32767 & this[t]
                  , u = this[t++] >> 15
                  , l = a * c + u * s;
                c = s * c + ((32767 & l) << 15) + n[r] + (1073741823 & i),
                i = (c >>> 30) + (l >>> 15) + a * u + (i >>> 30),
                n[r++] = 1073741823 & c
            }
            return i
        }
        ,
        30) : "Netscape" != navigator.appName ? (k.prototype.am = function(t, e, n, r, i, o) {
            for (; 0 <= --o; ) {
                var s = e * this[t++] + n[r] + i;
                i = Math.floor(s / 67108864),
                n[r++] = 67108863 & s
            }
            return i
        }
        ,
        26) : (k.prototype.am = function(t, e, n, r, i, o) {
            var s = 16383 & e
              , a = e >> 14;
            for (; 0 <= --o; ) {
                var c = 16383 & this[t]
                  , u = this[t++] >> 14
                  , l = a * c + u * s;
                c = s * c + ((16383 & l) << 14) + n[r] + i,
                i = (c >> 28) + (l >> 14) + a * u,
                n[r++] = 268435455 & c
            }
            return i
        }
        ,
        28),
        k.prototype.DB = S,
        k.prototype.DM = (1 << S) - 1,
        k.prototype.DV = 1 << S;
        k.prototype.FV = Math.pow(2, 52),
        k.prototype.F1 = 52 - S,
        k.prototype.F2 = 2 * S - 52;
        var B, M, L = [];
        for (B = "0".charCodeAt(0),
        M = 0; M <= 9; ++M)
            L[B++] = M;
        for (B = "a".charCodeAt(0),
        M = 10; M < 36; ++M)
            L[B++] = M;
        for (B = "A".charCodeAt(0),
        M = 10; M < 36; ++M)
            L[B++] = M;
        function V(t, e) {
            var n = L[t.charCodeAt(e)];
            return null == n ? -1 : n
        }
        function H(t) {
            var e = I();
            return e.fromInt(t),
            e
        }
        function q(t) {
            var e, n = 1;
            return 0 != (e = t >>> 16) && (t = e,
            n += 16),
            0 != (e = t >> 8) && (t = e,
            n += 8),
            0 != (e = t >> 4) && (t = e,
            n += 4),
            0 != (e = t >> 2) && (t = e,
            n += 2),
            0 != (e = t >> 1) && (t = e,
            n += 1),
            n
        }
        k.ZERO = H(0),
        k.ONE = H(1);
        var U = function() {
            function t() {
                this.i = 0,
                this.j = 0,
                this.S = []
            }
            return t.prototype.init = function(t) {
                var e, n, r;
                for (e = 0; e < 256; ++e)
                    this.S[e] = e;
                for (e = n = 0; e < 256; ++e)
                    n = n + this.S[e] + t[e % t.length] & 255,
                    r = this.S[e],
                    this.S[e] = this.S[n],
                    this.S[n] = r;
                this.i = 0,
                this.j = 0
            }
            ,
            t.prototype.next = function() {
                var t;
                return this.i = this.i + 1 & 255,
                this.j = this.j + this.S[this.i] & 255,
                t = this.S[this.i],
                this.S[this.i] = this.S[this.j],
                this.S[this.j] = t,
                this.S[t + this.S[this.i] & 255]
            }
            ,
            t
        }();
        var F, K, W = 256, z = null;
        if (null == z) {
            z = [];
            var $ = void (K = 0);
            if (window.crypto && window.crypto.getRandomValues) {
                var G = new Uint32Array(256);
                for (window.crypto.getRandomValues(G),
                $ = 0; $ < G.length; ++$)
                    z[K++] = 255 & G[$]
            }
            var X = function(t) {
                if (this.count = this.count || 0,
                256 <= this.count || W <= K)
                    window.removeEventListener ? window.removeEventListener("mousemove", X, !1) : window.detachEvent && window.detachEvent("onmousemove", X);
                else
                    try {
                        var e = t.x + t.y;
                        z[K++] = 255 & e,
                        this.count += 1
                    } catch (t) {}
            };
            window.addEventListener ? window.addEventListener("mousemove", X, !1) : window.attachEvent && window.attachEvent("onmousemove", X)
        }
        function J() {
            if (null == F) {
                for (F = new U; K < W; ) {
                    var t = Math.floor(65536 * Math.random());
                    z[K++] = 255 & t
                }
                for (F.init(z),
                K = 0; K < z.length; ++K)
                    z[K] = 0;
                K = 0
            }
            return F.next()
        }
        var Q = function() {
            function t() {}
            return t.prototype.nextBytes = function(t) {
                for (var e = 0; e < t.length; ++e)
                    t[e] = J()
            }
            ,
            t
        }();
        var Z = function() {
            function t() {
                this.n = null,
                this.e = 0,
                this.d = null,
                this.p = null,
                this.q = null,
                this.dmp1 = null,
                this.dmq1 = null,
                this.coeff = null
            }
            return t.prototype.doPublic = function(t) {
                return t.modPowInt(this.e, this.n)
            }
            ,
            t.prototype.doPrivate = function(t) {
                if (null == this.p || null == this.q)
                    return t.modPow(this.d, this.n);
                for (var e = t.mod(this.p).modPow(this.dmp1, this.p), n = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(n) < 0; )
                    e = e.add(this.p);
                return e.subtract(n).multiply(this.coeff).mod(this.p).multiply(this.q).add(n)
            }
            ,
            t.prototype.setPublic = function(t, e) {
                null != t && null != e && 0 < t.length && 0 < e.length && (this.n = P(t, 16),
                this.e = parseInt(e, 16))
            }
            ,
            t.prototype.encrypt = function(t) {
                var e = function(t, e) {
                    if (e < t.length + 11)
                        return null;
                    var n = []
                      , r = t.length - 1;
                    for (; 0 <= r && 0 < e; ) {
                        var i = t.charCodeAt(r--);
                        i < 128 ? n[--e] = i : 127 < i && i < 2048 ? (n[--e] = 63 & i | 128,
                        n[--e] = i >> 6 | 192) : (n[--e] = 63 & i | 128,
                        n[--e] = i >> 6 & 63 | 128,
                        n[--e] = i >> 12 | 224)
                    }
                    n[--e] = 0;
                    var o = new Q
                      , s = [];
                    for (; 2 < e; ) {
                        for (s[0] = 0; 0 == s[0]; )
                            o.nextBytes(s);
                        n[--e] = s[0]
                    }
                    return n[--e] = 2,
                    n[--e] = 0,
                    new k(n)
                }(t, this.n.bitLength() + 7 >> 3);
                if (null == e)
                    return null;
                var n = this.doPublic(e);
                if (null == n)
                    return null;
                var r = n.toString(16);
                return 0 == (1 & r.length) ? r : "0" + r
            }
            ,
            t.prototype.setPrivate = function(t, e, n) {
                null != t && null != e && 0 < t.length && 0 < e.length && (this.n = P(t, 16),
                this.e = parseInt(e, 16),
                this.d = P(n, 16))
            }
            ,
            t.prototype.setPrivateEx = function(t, e, n, r, i, o, s, a) {
                null != t && null != e && 0 < t.length && 0 < e.length && (this.n = P(t, 16),
                this.e = parseInt(e, 16),
                this.d = P(n, 16),
                this.p = P(r, 16),
                this.q = P(i, 16),
                this.dmp1 = P(o, 16),
                this.dmq1 = P(s, 16),
                this.coeff = P(a, 16))
            }
            ,
            t.prototype.generate = function(t, e) {
                var n = new Q
                  , r = t >> 1;
                this.e = parseInt(e, 16);
                for (var i = new k(e,16); ; ) {
                    for (; this.p = new k(t - r,1,n),
                    0 != this.p.subtract(k.ONE).gcd(i).compareTo(k.ONE) || !this.p.isProbablePrime(10); )
                        ;
                    for (; this.q = new k(r,1,n),
                    0 != this.q.subtract(k.ONE).gcd(i).compareTo(k.ONE) || !this.q.isProbablePrime(10); )
                        ;
                    if (this.p.compareTo(this.q) <= 0) {
                        var o = this.p;
                        this.p = this.q,
                        this.q = o
                    }
                    var s = this.p.subtract(k.ONE)
                      , a = this.q.subtract(k.ONE)
                      , c = s.multiply(a);
                    if (0 == c.gcd(i).compareTo(k.ONE)) {
                        this.n = this.p.multiply(this.q),
                        this.d = i.modInverse(c),
                        this.dmp1 = this.d.mod(s),
                        this.dmq1 = this.d.mod(a),
                        this.coeff = this.q.modInverse(this.p);
                        break
                    }
                }
            }
            ,
            t.prototype.decrypt = function(t) {
                var e = P(t, 16)
                  , n = this.doPrivate(e);
                return null == n ? null : function(t, e) {
                    var n = t.toByteArray()
                      , r = 0;
                    for (; r < n.length && 0 == n[r]; )
                        ++r;
                    if (n.length - r != e - 1 || 2 != n[r])
                        return null;
                    ++r;
                    for (; 0 != n[r]; )
                        if (++r >= n.length)
                            return null;
                    var i = "";
                    for (; ++r < n.length; ) {
                        var o = 255 & n[r];
                        o < 128 ? i += String.fromCharCode(o) : 191 < o && o < 224 ? (i += String.fromCharCode((31 & o) << 6 | 63 & n[r + 1]),
                        ++r) : (i += String.fromCharCode((15 & o) << 12 | (63 & n[r + 1]) << 6 | 63 & n[r + 2]),
                        r += 2)
                    }
                    return i
                }(n, this.n.bitLength() + 7 >> 3)
            }
            ,
            t.prototype.generateAsync = function(t, e, i) {
                var o = new Q
                  , s = t >> 1;
                this.e = parseInt(e, 16);
                var a = new k(e,16)
                  , c = this
                  , u = function() {
                    var e = function() {
                        if (c.p.compareTo(c.q) <= 0) {
                            var t = c.p;
                            c.p = c.q,
                            c.q = t
                        }
                        var e = c.p.subtract(k.ONE)
                          , n = c.q.subtract(k.ONE)
                          , r = e.multiply(n);
                        0 == r.gcd(a).compareTo(k.ONE) ? (c.n = c.p.multiply(c.q),
                        c.d = a.modInverse(r),
                        c.dmp1 = c.d.mod(e),
                        c.dmq1 = c.d.mod(n),
                        c.coeff = c.q.modInverse(c.p),
                        setTimeout(function() {
                            i()
                        }, 0)) : setTimeout(u, 0)
                    }
                      , n = function() {
                        c.q = I(),
                        c.q.fromNumberAsync(s, 1, o, function() {
                            c.q.subtract(k.ONE).gcda(a, function(t) {
                                0 == t.compareTo(k.ONE) && c.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(n, 0)
                            })
                        })
                    }
                      , r = function() {
                        c.p = I(),
                        c.p.fromNumberAsync(t - s, 1, o, function() {
                            c.p.subtract(k.ONE).gcda(a, function(t) {
                                0 == t.compareTo(k.ONE) && c.p.isProbablePrime(10) ? setTimeout(n, 0) : setTimeout(r, 0)
                            })
                        })
                    };
                    setTimeout(r, 0)
                };
                setTimeout(u, 0)
            }
            ,
            t.prototype.sign = function(t, e, n) {
                var r = function(t) {
                    return Y[t] || ""
                }(n)
                  , i = r + e(t).toString()
                  , o = function(t, e) {
                    if (e < t.length + 22)
                        return null;
                    for (var n = e - t.length - 6, r = "", i = 0; i < n; i += 2)
                        r += "ff";
                    return P("0001" + r + "00" + t, 16)
                }(i, this.n.bitLength() / 4);
                if (null == o)
                    return null;
                var s = this.doPrivate(o);
                if (null == s)
                    return null;
                var a = s.toString(16);
                return 0 == (1 & a.length) ? a : "0" + a
            }
            ,
            t.prototype.verify = function(t, e, n) {
                var r = P(e, 16)
                  , i = this.doPublic(r);
                if (null == i)
                    return null;
                var o = i.toString(16).replace(/^1f+00/, "")
                  , s = function(t) {
                    for (var e in Y)
                        if (Y.hasOwnProperty(e)) {
                            var n = Y[e]
                              , r = n.length;
                            if (t.substr(0, r) == n)
                                return t.substr(r)
                        }
                    return t
                }(o);
                return s == n(t).toString()
            }
            ,
            t
        }();
        var Y = {
            md2: "3020300c06082a864886f70d020205000410",
            md5: "3020300c06082a864886f70d020505000410",
            sha1: "3021300906052b0e03021a05000414",
            sha224: "302d300d06096086480165030402040500041c",
            sha256: "3031300d060960864801650304020105000420",
            sha384: "3041300d060960864801650304020205000430",
            sha512: "3051300d060960864801650304020305000440",
            ripemd160: "3021300906052b2403020105000414"
        };
        var tt = {};
        tt.lang = {
            extend: function(t, e, n) {
                if (!e || !t)
                    throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
                var r = function() {};
                if (r.prototype = e.prototype,
                t.prototype = new r,
                (t.prototype.constructor = t).superclass = e.prototype,
                e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e),
                n) {
                    var i;
                    for (i in n)
                        t.prototype[i] = n[i];
                    var o = function() {}
                      , s = ["toString", "valueOf"];
                    try {
                        /MSIE/.test(navigator.userAgent) && (o = function(t, e) {
                            for (i = 0; i < s.length; i += 1) {
                                var n = s[i]
                                  , r = e[n];
                                "function" == typeof r && r != Object.prototype[n] && (t[n] = r)
                            }
                        }
                        )
                    } catch (t) {}
                    o(t.prototype, n)
                }
            }
        };
        var et = {};
        void 0 !== et.asn1 && et.asn1 || (et.asn1 = {}),
        et.asn1.ASN1Util = new function() {
            this.integerToByteHex = function(t) {
                var e = t.toString(16);
                return e.length % 2 == 1 && (e = "0" + e),
                e
            }
            ,
            this.bigIntToMinTwosComplementsHex = function(t) {
                var e = t.toString(16);
                if ("-" != e.substr(0, 1))
                    e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
                else {
                    var n = e.substr(1)
                      , r = n.length;
                    r % 2 == 1 ? r += 1 : e.match(/^[0-7]/) || (r += 2);
                    for (var i = "", o = 0; o < r; o++)
                        i += "f";
                    var s = new k(i,16)
                      , a = s.xor(t).add(k.ONE);
                    e = a.toString(16).replace(/^-/, "")
                }
                return e
            }
            ,
            this.getPEMStringFromHex = function(t, e) {
                return hextopem(t, e)
            }
            ,
            this.newObject = function(t) {
                var e = et
                  , n = e.asn1
                  , r = n.DERBoolean
                  , i = n.DERInteger
                  , o = n.DERBitString
                  , s = n.DEROctetString
                  , a = n.DERNull
                  , c = n.DERObjectIdentifier
                  , u = n.DEREnumerated
                  , l = n.DERUTF8String
                  , h = n.DERNumericString
                  , f = n.DERPrintableString
                  , d = n.DERTeletexString
                  , p = n.DERIA5String
                  , g = n.DERUTCTime
                  , m = n.DERGeneralizedTime
                  , v = n.DERSequence
                  , y = n.DERSet
                  , b = n.DERTaggedObject
                  , w = n.ASN1Util.newObject
                  , x = Object.keys(t);
                if (1 != x.length)
                    throw "key of param shall be only one.";
                var T = x[0];
                if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + T + ":"))
                    throw "undefined key: " + T;
                if ("bool" == T)
                    return new r(t[T]);
                if ("int" == T)
                    return new i(t[T]);
                if ("bitstr" == T)
                    return new o(t[T]);
                if ("octstr" == T)
                    return new s(t[T]);
                if ("null" == T)
                    return new a(t[T]);
                if ("oid" == T)
                    return new c(t[T]);
                if ("enum" == T)
                    return new u(t[T]);
                if ("utf8str" == T)
                    return new l(t[T]);
                if ("numstr" == T)
                    return new h(t[T]);
                if ("prnstr" == T)
                    return new f(t[T]);
                if ("telstr" == T)
                    return new d(t[T]);
                if ("ia5str" == T)
                    return new p(t[T]);
                if ("utctime" == T)
                    return new g(t[T]);
                if ("gentime" == T)
                    return new m(t[T]);
                if ("seq" == T) {
                    for (var S = t[T], E = [], A = 0; A < S.length; A++) {
                        var _ = w(S[A]);
                        E.push(_)
                    }
                    return new v({
                        array: E
                    })
                }
                if ("set" == T) {
                    for (var S = t[T], E = [], A = 0; A < S.length; A++) {
                        var _ = w(S[A]);
                        E.push(_)
                    }
                    return new y({
                        array: E
                    })
                }
                if ("tag" == T) {
                    var D = t[T];
                    if ("[object Array]" === Object.prototype.toString.call(D) && 3 == D.length) {
                        var C = w(D[2]);
                        return new b({
                            tag: D[0],
                            explicit: D[1],
                            obj: C
                        })
                    }
                    var k = {};
                    if (void 0 !== D.explicit && (k.explicit = D.explicit),
                    void 0 !== D.tag && (k.tag = D.tag),
                    void 0 === D.obj)
                        throw "obj shall be specified for 'tag'.";
                    return k.obj = w(D.obj),
                    new b(k)
                }
            }
            ,
            this.jsonToASN1HEX = function(t) {
                var e = this.newObject(t);
                return e.getEncodedHex()
            }
        }
        ,
        et.asn1.ASN1Util.oidHexToInt = function(t) {
            for (var e = "", n = parseInt(t.substr(0, 2), 16), r = Math.floor(n / 40), i = n % 40, e = r + "." + i, o = "", s = 2; s < t.length; s += 2) {
                var a = parseInt(t.substr(s, 2), 16)
                  , c = ("00000000" + a.toString(2)).slice(-8);
                if (o += c.substr(1, 7),
                "0" == c.substr(0, 1)) {
                    var u = new k(o,2);
                    e = e + "." + u.toString(10),
                    o = ""
                }
            }
            return e
        }
        ,
        et.asn1.ASN1Util.oidIntToHex = function(t) {
            var c = function(t) {
                var e = t.toString(16);
                return 1 == e.length && (e = "0" + e),
                e
            }
              , e = function(t) {
                var e = ""
                  , n = new k(t,10)
                  , r = n.toString(2)
                  , i = 7 - r.length % 7;
                7 == i && (i = 0);
                for (var o = "", s = 0; s < i; s++)
                    o += "0";
                r = o + r;
                for (var s = 0; s < r.length - 1; s += 7) {
                    var a = r.substr(s, 7);
                    s != r.length - 7 && (a = "1" + a),
                    e += c(parseInt(a, 2))
                }
                return e
            };
            if (!t.match(/^[0-9.]+$/))
                throw "malformed oid string: " + t;
            var n = ""
              , r = t.split(".")
              , i = 40 * parseInt(r[0]) + parseInt(r[1]);
            n += c(i),
            r.splice(0, 2);
            for (var o = 0; o < r.length; o++)
                n += e(r[o]);
            return n
        }
        ,
        et.asn1.ASN1Object = function() {
            this.getLengthHexFromValue = function() {
                if (void 0 === this.hV || null == this.hV)
                    throw "this.hV is null or undefined.";
                if (this.hV.length % 2 == 1)
                    throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
                var t = this.hV.length / 2
                  , e = t.toString(16);
                if (e.length % 2 == 1 && (e = "0" + e),
                t < 128)
                    return e;
                var n = e.length / 2;
                if (15 < n)
                    throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
                var r = 128 + n;
                return r.toString(16) + e
            }
            ,
            this.getEncodedHex = function() {
                return null != this.hTLV && !this.isModified || (this.hV = this.getFreshValueHex(),
                this.hL = this.getLengthHexFromValue(),
                this.hTLV = this.hT + this.hL + this.hV,
                this.isModified = !1),
                this.hTLV
            }
            ,
            this.getValueHex = function() {
                return this.getEncodedHex(),
                this.hV
            }
            ,
            this.getFreshValueHex = function() {
                return ""
            }
        }
        ,
        et.asn1.DERAbstractString = function(t) {
            et.asn1.DERAbstractString.superclass.constructor.call(this),
            this.getString = function() {
                return this.s
            }
            ,
            this.setString = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = t,
                this.hV = stohex(this.s)
            }
            ,
            this.setStringHex = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
        }
        ,
        tt.lang.extend(et.asn1.DERAbstractString, et.asn1.ASN1Object),
        et.asn1.DERAbstractTime = function(t) {
            et.asn1.DERAbstractTime.superclass.constructor.call(this),
            this.localDateToUTC = function(t) {
                utc = t.getTime() + 6e4 * t.getTimezoneOffset();
                var e = new Date(utc);
                return e
            }
            ,
            this.formatDate = function(t, e, n) {
                var r = this.zeroPadding
                  , i = this.localDateToUTC(t)
                  , o = String(i.getFullYear());
                "utc" == e && (o = o.substr(2, 2));
                var s = r(String(i.getMonth() + 1), 2)
                  , a = r(String(i.getDate()), 2)
                  , c = r(String(i.getHours()), 2)
                  , u = r(String(i.getMinutes()), 2)
                  , l = r(String(i.getSeconds()), 2)
                  , h = o + s + a + c + u + l;
                if (!0 === n) {
                    var f = i.getMilliseconds();
                    if (0 != f) {
                        var d = r(String(f), 3);
                        d = d.replace(/[0]+$/, ""),
                        h = h + "." + d
                    }
                }
                return h + "Z"
            }
            ,
            this.zeroPadding = function(t, e) {
                return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
            }
            ,
            this.getString = function() {
                return this.s
            }
            ,
            this.setString = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = t,
                this.hV = stohex(t)
            }
            ,
            this.setByDateValue = function(t, e, n, r, i, o) {
                var s = new Date(Date.UTC(t, e - 1, n, r, i, o, 0));
                this.setByDate(s)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
        }
        ,
        tt.lang.extend(et.asn1.DERAbstractTime, et.asn1.ASN1Object),
        et.asn1.DERAbstractStructured = function(t) {
            et.asn1.DERAbstractString.superclass.constructor.call(this),
            this.setByASN1ObjectArray = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.asn1Array = t
            }
            ,
            this.appendASN1Object = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.asn1Array.push(t)
            }
            ,
            this.asn1Array = new Array,
            void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
        }
        ,
        tt.lang.extend(et.asn1.DERAbstractStructured, et.asn1.ASN1Object),
        et.asn1.DERBoolean = function() {
            et.asn1.DERBoolean.superclass.constructor.call(this),
            this.hT = "01",
            this.hTLV = "0101ff"
        }
        ,
        tt.lang.extend(et.asn1.DERBoolean, et.asn1.ASN1Object),
        et.asn1.DERInteger = function(t) {
            et.asn1.DERInteger.superclass.constructor.call(this),
            this.hT = "02",
            this.setByBigInteger = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
            }
            ,
            this.setByInteger = function(t) {
                var e = new k(String(t),10);
                this.setByBigInteger(e)
            }
            ,
            this.setValueHex = function(t) {
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }
        ,
        tt.lang.extend(et.asn1.DERInteger, et.asn1.ASN1Object),
        et.asn1.DERBitString = function(t) {
            if (void 0 !== t && void 0 !== t.obj) {
                var e = et.asn1.ASN1Util.newObject(t.obj);
                t.hex = "00" + e.getEncodedHex()
            }
            et.asn1.DERBitString.superclass.constructor.call(this),
            this.hT = "03",
            this.setHexValueIncludingUnusedBits = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = t
            }
            ,
            this.setUnusedBitsAndHexValue = function(t, e) {
                if (t < 0 || 7 < t)
                    throw "unused bits shall be from 0 to 7: u = " + t;
                var n = "0" + t;
                this.hTLV = null,
                this.isModified = !0,
                this.hV = n + e
            }
            ,
            this.setByBinaryString = function(t) {
                var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
                8 == e && (e = 0);
                for (var n = 0; n <= e; n++)
                    t += "0";
                for (var r = "", n = 0; n < t.length - 1; n += 8) {
                    var i = t.substr(n, 8)
                      , o = parseInt(i, 2).toString(16);
                    1 == o.length && (o = "0" + o),
                    r += o
                }
                this.hTLV = null,
                this.isModified = !0,
                this.hV = "0" + e + r
            }
            ,
            this.setByBooleanArray = function(t) {
                for (var e = "", n = 0; n < t.length; n++)
                    1 == t[n] ? e += "1" : e += "0";
                this.setByBinaryString(e)
            }
            ,
            this.newFalseArray = function(t) {
                for (var e = new Array(t), n = 0; n < t; n++)
                    e[n] = !1;
                return e
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
        }
        ,
        tt.lang.extend(et.asn1.DERBitString, et.asn1.ASN1Object),
        et.asn1.DEROctetString = function(t) {
            if (void 0 !== t && void 0 !== t.obj) {
                var e = et.asn1.ASN1Util.newObject(t.obj);
                t.hex = e.getEncodedHex()
            }
            et.asn1.DEROctetString.superclass.constructor.call(this, t),
            this.hT = "04"
        }
        ,
        tt.lang.extend(et.asn1.DEROctetString, et.asn1.DERAbstractString),
        et.asn1.DERNull = function() {
            et.asn1.DERNull.superclass.constructor.call(this),
            this.hT = "05",
            this.hTLV = "0500"
        }
        ,
        tt.lang.extend(et.asn1.DERNull, et.asn1.ASN1Object),
        et.asn1.DERObjectIdentifier = function(t) {
            var c = function(t) {
                var e = t.toString(16);
                return 1 == e.length && (e = "0" + e),
                e
            }
              , o = function(t) {
                var e = ""
                  , n = new k(t,10)
                  , r = n.toString(2)
                  , i = 7 - r.length % 7;
                7 == i && (i = 0);
                for (var o = "", s = 0; s < i; s++)
                    o += "0";
                r = o + r;
                for (var s = 0; s < r.length - 1; s += 7) {
                    var a = r.substr(s, 7);
                    s != r.length - 7 && (a = "1" + a),
                    e += c(parseInt(a, 2))
                }
                return e
            };
            et.asn1.DERObjectIdentifier.superclass.constructor.call(this),
            this.hT = "06",
            this.setValueHex = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = t
            }
            ,
            this.setValueOidString = function(t) {
                if (!t.match(/^[0-9.]+$/))
                    throw "malformed oid string: " + t;
                var e = ""
                  , n = t.split(".")
                  , r = 40 * parseInt(n[0]) + parseInt(n[1]);
                e += c(r),
                n.splice(0, 2);
                for (var i = 0; i < n.length; i++)
                    e += o(n[i]);
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = e
            }
            ,
            this.setValueName = function(t) {
                var e = et.asn1.x509.OID.name2oid(t);
                if ("" === e)
                    throw "DERObjectIdentifier oidName undefined: " + t;
                this.setValueOidString(e)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
        }
        ,
        tt.lang.extend(et.asn1.DERObjectIdentifier, et.asn1.ASN1Object),
        et.asn1.DEREnumerated = function(t) {
            et.asn1.DEREnumerated.superclass.constructor.call(this),
            this.hT = "0a",
            this.setByBigInteger = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
            }
            ,
            this.setByInteger = function(t) {
                var e = new k(String(t),10);
                this.setByBigInteger(e)
            }
            ,
            this.setValueHex = function(t) {
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }
        ,
        tt.lang.extend(et.asn1.DEREnumerated, et.asn1.ASN1Object),
        et.asn1.DERUTF8String = function(t) {
            et.asn1.DERUTF8String.superclass.constructor.call(this, t),
            this.hT = "0c"
        }
        ,
        tt.lang.extend(et.asn1.DERUTF8String, et.asn1.DERAbstractString),
        et.asn1.DERNumericString = function(t) {
            et.asn1.DERNumericString.superclass.constructor.call(this, t),
            this.hT = "12"
        }
        ,
        tt.lang.extend(et.asn1.DERNumericString, et.asn1.DERAbstractString),
        et.asn1.DERPrintableString = function(t) {
            et.asn1.DERPrintableString.superclass.constructor.call(this, t),
            this.hT = "13"
        }
        ,
        tt.lang.extend(et.asn1.DERPrintableString, et.asn1.DERAbstractString),
        et.asn1.DERTeletexString = function(t) {
            et.asn1.DERTeletexString.superclass.constructor.call(this, t),
            this.hT = "14"
        }
        ,
        tt.lang.extend(et.asn1.DERTeletexString, et.asn1.DERAbstractString),
        et.asn1.DERIA5String = function(t) {
            et.asn1.DERIA5String.superclass.constructor.call(this, t),
            this.hT = "16"
        }
        ,
        tt.lang.extend(et.asn1.DERIA5String, et.asn1.DERAbstractString),
        et.asn1.DERUTCTime = function(t) {
            et.asn1.DERUTCTime.superclass.constructor.call(this, t),
            this.hT = "17",
            this.setByDate = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.date = t,
                this.s = this.formatDate(this.date, "utc"),
                this.hV = stohex(this.s)
            }
            ,
            this.getFreshValueHex = function() {
                return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                this.s = this.formatDate(this.date, "utc"),
                this.hV = stohex(this.s)),
                this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
        }
        ,
        tt.lang.extend(et.asn1.DERUTCTime, et.asn1.DERAbstractTime),
        et.asn1.DERGeneralizedTime = function(t) {
            et.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
            this.hT = "18",
            this.withMillis = !1,
            this.setByDate = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.date = t,
                this.s = this.formatDate(this.date, "gen", this.withMillis),
                this.hV = stohex(this.s)
            }
            ,
            this.getFreshValueHex = function() {
                return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                this.s = this.formatDate(this.date, "gen", this.withMillis),
                this.hV = stohex(this.s)),
                this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date),
            !0 === t.millis && (this.withMillis = !0))
        }
        ,
        tt.lang.extend(et.asn1.DERGeneralizedTime, et.asn1.DERAbstractTime),
        et.asn1.DERSequence = function(t) {
            et.asn1.DERSequence.superclass.constructor.call(this, t),
            this.hT = "30",
            this.getFreshValueHex = function() {
                for (var t = "", e = 0; e < this.asn1Array.length; e++) {
                    var n = this.asn1Array[e];
                    t += n.getEncodedHex()
                }
                return this.hV = t,
                this.hV
            }
        }
        ,
        tt.lang.extend(et.asn1.DERSequence, et.asn1.DERAbstractStructured),
        et.asn1.DERSet = function(t) {
            et.asn1.DERSet.superclass.constructor.call(this, t),
            this.hT = "31",
            this.sortFlag = !0,
            this.getFreshValueHex = function() {
                for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                    var n = this.asn1Array[e];
                    t.push(n.getEncodedHex())
                }
                return 1 == this.sortFlag && t.sort(),
                this.hV = t.join(""),
                this.hV
            }
            ,
            void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
        }
        ,
        tt.lang.extend(et.asn1.DERSet, et.asn1.DERAbstractStructured),
        et.asn1.DERTaggedObject = function(t) {
            et.asn1.DERTaggedObject.superclass.constructor.call(this),
            this.hT = "a0",
            this.hV = "",
            this.isExplicit = !0,
            this.asn1Object = null,
            this.setASN1Object = function(t, e, n) {
                this.hT = e,
                this.isExplicit = t,
                this.asn1Object = n,
                this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
                this.hTLV = null,
                this.isModified = !0) : (this.hV = null,
                this.hTLV = n.getEncodedHex(),
                this.hTLV = this.hTLV.replace(/^../, e),
                this.isModified = !1)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag),
            void 0 !== t.explicit && (this.isExplicit = t.explicit),
            void 0 !== t.obj && (this.asn1Object = t.obj,
            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
        }
        ,
        tt.lang.extend(et.asn1.DERTaggedObject, et.asn1.ASN1Object);
        var nt = function(n) {
            function r(t) {
                var e = n.call(this) || this;
                return t && ("string" == typeof t ? e.parseKey(t) : (r.hasPrivateKeyProperty(t) || r.hasPublicKeyProperty(t)) && e.parsePropertiesFrom(t)),
                e
            }
            return function(t, e) {
                function n() {
                    this.constructor = t
                }
                d(t, e),
                t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                new n)
            }(r, n),
            r.prototype.parseKey = function(t) {
                try {
                    var e = 0
                      , n = 0
                      , r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? g.decode(t) : m.unarmor(t)
                      , i = A.decode(r);
                    if (3 === i.sub.length && (i = i.sub[2].sub[0]),
                    9 === i.sub.length) {
                        e = i.sub[1].getHexStringValue(),
                        this.n = P(e, 16),
                        n = i.sub[2].getHexStringValue(),
                        this.e = parseInt(n, 16);
                        var o = i.sub[3].getHexStringValue();
                        this.d = P(o, 16);
                        var s = i.sub[4].getHexStringValue();
                        this.p = P(s, 16);
                        var a = i.sub[5].getHexStringValue();
                        this.q = P(a, 16);
                        var c = i.sub[6].getHexStringValue();
                        this.dmp1 = P(c, 16);
                        var u = i.sub[7].getHexStringValue();
                        this.dmq1 = P(u, 16);
                        var l = i.sub[8].getHexStringValue();
                        this.coeff = P(l, 16)
                    } else {
                        if (2 !== i.sub.length)
                            return !1;
                        var h = i.sub[1]
                          , f = h.sub[0];
                        e = f.sub[0].getHexStringValue(),
                        this.n = P(e, 16),
                        n = f.sub[1].getHexStringValue(),
                        this.e = parseInt(n, 16)
                    }
                    return !0
                } catch (t) {
                    return !1
                }
            }
            ,
            r.prototype.getPrivateBaseKey = function() {
                var t = {
                    array: [new et.asn1.DERInteger({
                        int: 0
                    }), new et.asn1.DERInteger({
                        bigint: this.n
                    }), new et.asn1.DERInteger({
                        int: this.e
                    }), new et.asn1.DERInteger({
                        bigint: this.d
                    }), new et.asn1.DERInteger({
                        bigint: this.p
                    }), new et.asn1.DERInteger({
                        bigint: this.q
                    }), new et.asn1.DERInteger({
                        bigint: this.dmp1
                    }), new et.asn1.DERInteger({
                        bigint: this.dmq1
                    }), new et.asn1.DERInteger({
                        bigint: this.coeff
                    })]
                }
                  , e = new et.asn1.DERSequence(t);
                return e.getEncodedHex()
            }
            ,
            r.prototype.getPrivateBaseKeyB64 = function() {
                return l(this.getPrivateBaseKey())
            }
            ,
            r.prototype.getPublicBaseKey = function() {
                var t = new et.asn1.DERSequence({
                    array: [new et.asn1.DERObjectIdentifier({
                        oid: "1.2.840.113549.1.1.1"
                    }), new et.asn1.DERNull]
                })
                  , e = new et.asn1.DERSequence({
                    array: [new et.asn1.DERInteger({
                        bigint: this.n
                    }), new et.asn1.DERInteger({
                        int: this.e
                    })]
                })
                  , n = new et.asn1.DERBitString({
                    hex: "00" + e.getEncodedHex()
                })
                  , r = new et.asn1.DERSequence({
                    array: [t, n]
                });
                return r.getEncodedHex()
            }
            ,
            r.prototype.getPublicBaseKeyB64 = function() {
                return l(this.getPublicBaseKey())
            }
            ,
            r.wordwrap = function(t, e) {
                if (e = e || 64,
                !t)
                    return t;
                var n = "(.{1," + e + "})( +|$\n?)|(.{1," + e + "})";
                return t.match(RegExp(n, "g")).join("\n")
            }
            ,
            r.prototype.getPrivateKey = function() {
                var t = "-----BEGIN RSA PRIVATE KEY-----\n";
                return t += r.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
                t += "-----END RSA PRIVATE KEY-----"
            }
            ,
            r.prototype.getPublicKey = function() {
                var t = "-----BEGIN PUBLIC KEY-----\n";
                return t += r.wordwrap(this.getPublicBaseKeyB64()) + "\n",
                t += "-----END PUBLIC KEY-----"
            }
            ,
            r.hasPublicKeyProperty = function(t) {
                return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e")
            }
            ,
            r.hasPrivateKeyProperty = function(t) {
                return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
            }
            ,
            r.prototype.parsePropertiesFrom = function(t) {
                this.n = t.n,
                this.e = t.e,
                t.hasOwnProperty("d") && (this.d = t.d,
                this.p = t.p,
                this.q = t.q,
                this.dmp1 = t.dmp1,
                this.dmq1 = t.dmq1,
                this.coeff = t.coeff)
            }
            ,
            r
        }(Z)
          , rt = function() {
            function t(t) {
                t = t || {},
                this.default_key_size = parseInt(t.default_key_size, 10) || 1024,
                this.default_public_exponent = t.default_public_exponent || "010001",
                this.log = t.log || !1,
                this.key = null
            }
            return t.prototype.setKey = function(t) {
                this.log && this.key,
                this.key = new nt(t)
            }
            ,
            t.prototype.setPrivateKey = function(t) {
                this.setKey(t)
            }
            ,
            t.prototype.setPublicKey = function(t) {
                this.setKey(t)
            }
            ,
            t.prototype.decrypt = function(t) {
                try {
                    return this.getKey().decrypt(h(t))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.encrypt = function(t) {
                try {
                    return l(this.getKey().encrypt(t))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.sign = function(t, e, n) {
                try {
                    return l(this.getKey().sign(t, e, n))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.verify = function(t, e, n) {
                try {
                    return this.getKey().verify(t, h(e), n)
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.getKey = function(t) {
                if (!this.key) {
                    if (this.key = new nt,
                    t && "[object Function]" === {}.toString.call(t))
                        return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
                    this.key.generate(this.default_key_size, this.default_public_exponent)
                }
                return this.key
            }
            ,
            t.prototype.getPrivateKey = function() {
                return this.getKey().getPrivateKey()
            }
            ,
            t.prototype.getPrivateKeyB64 = function() {
                return this.getKey().getPrivateBaseKeyB64()
            }
            ,
            t.prototype.getPublicKey = function() {
                return this.getKey().getPublicKey()
            }
            ,
            t.prototype.getPublicKeyB64 = function() {
                return this.getKey().getPublicBaseKeyB64()
            }
            ,
            t.version = "3.0.0-rc.1",
            t
        }();
        window.JSEncrypt = rt,
        t.JSEncrypt = rt,
        t.default = rt,
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }(e)
},
})


function jiami(password){
    var i = aaa(5)
  , s = aaa.n(i);
    var bbb= new s.a;
    return bbb.encrypt(password);
}