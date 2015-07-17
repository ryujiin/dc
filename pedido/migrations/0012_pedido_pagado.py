# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0011_estadopedido_slug_estado'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='pagado',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
