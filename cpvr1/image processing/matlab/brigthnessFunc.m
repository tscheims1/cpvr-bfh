function y= brigthnessFunc( x,c,b)
    y = x*x+b;
    if(y<0)
    {
            y=0;
    }
    if(y>255){y=255};
end

